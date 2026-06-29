import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { generateToken } from '../middleware/auth.js';

const router = Router();

// 生成6位验证码
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 发送短信验证码
router.post('/send-code', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: '请输入正确的手机号' });
    }

    // 检查60秒冷却
    const recent = await prisma.smsCode.findFirst({
      where: {
        phone,
        createdAt: { gte: new Date(Date.now() - 60 * 1000) },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (recent) {
      const remaining = Math.ceil(
        (recent.createdAt.getTime() + 60 * 1000 - Date.now()) / 1000
      );
      return res.status(429).json({
        success: false,
        message: `请 ${remaining} 秒后再试`,
      });
    }

    const code = generateCode();

    // 存储验证码
    await prisma.smsCode.create({
      data: {
        phone,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // TODO: 接入真实短信网关
    // 开发环境返回验证码
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[SMS] ${phone} -> ${code}`);
      return res.json({ success: true, message: '验证码已发送', devCode: code });
    }

    res.json({ success: true, message: '验证码已发送' });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({ success: false, message: '参数不完整' });
    }

    // 验证验证码
    const smsRecord = await prisma.smsCode.findFirst({
      where: {
        phone,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!smsRecord) {
      return res.status(401).json({ success: false, message: '验证码错误或已过期' });
    }

    // 标记已使用
    await prisma.smsCode.update({
      where: { id: smsRecord.id },
      data: { used: true },
    });

    // 查找或创建用户
    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          nickname: `用户${phone.slice(-4)}`,
          preferences: { create: {} },
        },
        include: { preferences: true },
      });
    } else {
      // 确保有偏好设置
      const prefs = await prisma.userPreferences.findUnique({
        where: { userId: user.id },
      });
      if (!prefs) {
        await prisma.userPreferences.create({ data: { userId: user.id } });
      }
    }

    // 检查VIP是否过期
    let isVIP = user.isVIP;
    if (isVIP && user.vipExpiry && user.vipExpiry < new Date()) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isVIP: false },
      });
      isVIP = false;
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          phone: user.phone,
          nickname: user.nickname,
          avatar: user.avatar,
          bio: user.bio,
          isVIP,
          vipExpiry: user.vipExpiry,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
