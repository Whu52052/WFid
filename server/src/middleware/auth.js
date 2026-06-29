import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const JWT_EXPIRES_IN = '30d';

// 生成 token
export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// 验证 token 中间件
export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: '请先登录' });
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        nickname: true,
        avatar: true,
        isVIP: true,
        vipExpiry: true,
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: '用户不存在' });
    }

    // 更新最后在线时间
    await prisma.user.update({
      where: { id: user.id },
      data: { lastOnlineAt: new Date() },
    });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: '登录已过期，请重新登录' });
  }
}

// Socket.IO 认证
export async function socketAuth(socket, next) {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('未授权'));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        nickname: true,
        avatar: true,
      },
    });

    if (!user) {
      return next(new Error('用户不存在'));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error('认证失败'));
  }
}
