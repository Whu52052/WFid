import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// 获取会话列表
router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // 找出所有和当前用户有过消息的用户
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, nickname: true, avatar: true } },
        receiver: { select: { id: true, nickname: true, avatar: true } },
      },
    });

    // 按对方用户分组，取每个会话最后一条消息
    const conversationsMap = new Map();

    for (const msg of messages) {
      const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!conversationsMap.has(otherUserId)) {
        const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;
        conversationsMap.set(otherUserId, {
          userId: otherUser.id,
          nickname: otherUser.nickname,
          avatar: otherUser.avatar,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          unreadCount: 0,
        });
      }
    }

    // 计算未读消息数
    const unreadCounts = await prisma.message.groupBy({
      by: ['senderId'],
      where: {
        receiverId: userId,
        isRead: false,
      },
      _count: { id: true },
    });

    for (const { senderId, _count } of unreadCounts) {
      if (conversationsMap.has(senderId)) {
        conversationsMap.get(senderId).unreadCount = _count.id;
      }
    }

    const conversations = Array.from(conversationsMap.values()).sort(
      (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );

    res.json({ success: true, data: conversations });
  } catch (error) {
    console.error('获取会话列表失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取与某个用户的历史消息
router.get('/messages/:userId', authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;
    const { before, limit = 50 } = req.query;

    const where = {
      OR: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId },
      ],
    };

    if (before) {
      where.createdAt = { lt: new Date(before) };
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      include: {
        sender: { select: { id: true, nickname: true, avatar: true } },
      },
    });

    // 标记对方发的消息为已读
    await prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: currentUserId,
        isRead: false,
      },
      data: { isRead: true },
    });

    res.json({
      success: true,
      data: messages.reverse(), // 按时间正序返回
    });
  } catch (error) {
    console.error('获取消息失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 发送消息
router.post('/messages', authMiddleware, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content, type = 'text' } = req.body;

    if (!receiverId || !content?.trim()) {
      return res.status(400).json({ success: false, message: '参数不完整' });
    }

    // 检查接收方是否存在
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { id: true, nickname: true, avatar: true },
    });

    if (!receiver) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content: content.trim(),
        type,
      },
      include: {
        sender: { select: { id: true, nickname: true, avatar: true } },
      },
    });

    // 通过 Socket.IO 推送实时消息
    const io = req.app.get('io');
    if (io) {
      // 推送给接收方
      io.to(`user:${receiverId}`).emit('message:new', message);
      // 推送给发送方（其他设备）
      io.to(`user:${senderId}`).emit('message:new', message);
    }

    res.json({ success: true, data: message });
  } catch (error) {
    console.error('发送消息失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 标记消息已读
router.post('/messages/read/:userId', authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;

    await prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: currentUserId,
        isRead: false,
      },
      data: { isRead: true },
    });

    // 通知对方已读
    const io = req.app.get('io');
    if (io) {
      io.to(`user:${otherUserId}`).emit('message:read', {
        userId: currentUserId,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('标记已读失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取未读消息总数
router.get('/unread-count', authMiddleware, async (req, res) => {
  try {
    const count = await prisma.message.count({
      where: {
        receiverId: req.user.id,
        isRead: false,
      },
    });

    res.json({ success: true, data: { count } });
  } catch (error) {
    console.error('获取未读数量失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 搜索用户
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword?.trim()) {
      return res.json({ success: true, data: [] });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { nickname: { contains: keyword } },
          { username: { contains: keyword } },
        ],
      },
      select: {
        id: true,
        nickname: true,
        avatar: true,
        bio: true,
      },
      take: 20,
    });

    res.json({ success: true, data: users });
  } catch (error) {
    console.error('搜索用户失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
