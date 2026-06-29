import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// 获取用户信息
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { preferences: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
        bio: user.bio,
        isVIP: user.isVIP,
        vipExpiry: user.vipExpiry,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 更新用户信息
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { nickname, avatar, bio, preferences } = req.body;

    const userData = {};
    if (nickname !== undefined) userData.nickname = nickname;
    if (avatar !== undefined) userData.avatar = avatar;
    if (bio !== undefined) userData.bio = bio;

    if (Object.keys(userData).length > 0) {
      await prisma.user.update({
        where: { id: req.user.id },
        data: userData,
      });
    }

    if (preferences) {
      await prisma.userPreferences.upsert({
        where: { userId: req.user.id },
        create: { userId: req.user.id, ...preferences },
        update: preferences,
      });
    }

    res.json({ success: true, message: '更新成功' });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 数据同步 - 拉取
router.get('/sync', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [user, preferences, testRecords, favorites] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.userPreferences.findUnique({ where: { userId } }),
      prisma.testRecord.findMany({
        where: { userId },
        orderBy: { completedAt: 'desc' },
      }),
      prisma.favoriteTest.findMany({ where: { userId } }),
    ]);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          bio: user.bio,
          isVIP: user.isVIP,
          vipExpiry: user.vipExpiry,
        },
        preferences: preferences || { theme: 'dark', language: 'zh-CN', fontSize: 'medium', animations: true },
        testRecords: testRecords.map(r => ({
          ...r,
          resultData: JSON.parse(r.resultData),
        })),
        favorites: favorites.map(f => f.testId),
      },
    });
  } catch (error) {
    console.error('数据同步失败:', error);
    res.status(500).json({ success: false, message: '同步失败' });
  }
});

// 数据同步 - 推送（合并本地数据到服务器）
router.post('/sync', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { testRecords, favorites, preferences, userInfo } = req.body;

    // 1. 同步用户信息
    if (userInfo) {
      const updateData = {};
      if (userInfo.nickname !== undefined) updateData.nickname = userInfo.nickname;
      if (userInfo.avatar !== undefined) updateData.avatar = userInfo.avatar;
      if (userInfo.bio !== undefined) updateData.bio = userInfo.bio;
      if (Object.keys(updateData).length > 0) {
        await prisma.user.update({ where: { id: userId }, data: updateData });
      }
    }

    // 2. 同步测试记录
    if (testRecords?.length > 0) {
      for (const record of testRecords) {
        await prisma.testRecord.upsert({
          where: {
            userId_sessionId: { userId, sessionId: record.sessionId },
          },
          create: {
            userId,
            testId: record.testId,
            sessionId: record.sessionId,
            resultType: record.resultType,
            resultTitle: record.resultTitle,
            resultEmoji: record.resultEmoji,
            resultData: JSON.stringify(record.resultData),
            isPremium: record.isPremium || false,
            completedAt: record.completedAt ? new Date(record.completedAt) : new Date(),
          },
          update: {
            resultType: record.resultType,
            resultTitle: record.resultTitle,
            resultEmoji: record.resultEmoji,
            resultData: JSON.stringify(record.resultData),
          },
        });
      }
    }

    // 3. 同步收藏
    if (favorites?.length > 0) {
      for (const testId of favorites) {
        await prisma.favoriteTest.upsert({
          where: { userId_testId: { userId, testId } },
          create: { userId, testId },
          update: {},
        });
      }
    }

    // 4. 同步偏好
    if (preferences) {
      await prisma.userPreferences.upsert({
        where: { userId },
        create: { userId, ...preferences },
        update: preferences,
      });
    }

    // 返回服务器最新数据
    const [user, prefs, records, favs] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.userPreferences.findUnique({ where: { userId } }),
      prisma.testRecord.findMany({
        where: { userId },
        orderBy: { completedAt: 'desc' },
      }),
      prisma.favoriteTest.findMany({ where: { userId } }),
    ]);

    res.json({
      success: true,
      message: '同步成功',
      data: {
        user: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          bio: user.bio,
          isVIP: user.isVIP,
          vipExpiry: user.vipExpiry,
        },
        preferences: prefs || { theme: 'dark', language: 'zh-CN', fontSize: 'medium', animations: true },
        testRecords: records.map(r => ({
          ...r,
          resultData: JSON.parse(r.resultData),
        })),
        favorites: favs.map(f => f.testId),
      },
    });
  } catch (error) {
    console.error('数据同步失败:', error);
    res.status(500).json({ success: false, message: '同步失败' });
  }
});

// 测试记录列表
router.get('/test-records', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { testId, page = 1, pageSize = 20 } = req.query;

    const where = { userId };
    if (testId) where.testId = testId;

    const skip = (page - 1) * pageSize;
    const take = parseInt(pageSize);

    const [records, total] = await Promise.all([
      prisma.testRecord.findMany({
        where,
        orderBy: { completedAt: 'desc' },
        skip,
        take,
      }),
      prisma.testRecord.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        records: records.map(r => ({
          ...r,
          resultData: JSON.parse(r.resultData),
        })),
        pagination: {
          page: parseInt(page),
          pageSize: take,
          total,
          totalPages: Math.ceil(total / take),
        },
      },
    });
  } catch (error) {
    console.error('获取测试记录失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
