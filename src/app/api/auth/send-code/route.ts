// ============================================================================
// 发送短信验证码 API
// POST /api/auth/send-code
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { generateCode, sendSms } from '@/lib/sms';

// 限制发送频率：同一手机号60秒内不能重复发送
const CODE_COOLDOWN = 60; // 秒

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // 验证手机号格式
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: '请输入正确的手机号' },
        { status: 400 }
      );
    }

    // 检查发送频率
    const recentCode = await prisma.smsCode.findFirst({
      where: {
        phone,
        createdAt: {
          gte: new Date(Date.now() - CODE_COOLDOWN * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (recentCode) {
      const remainingTime = Math.ceil(
        (recentCode.createdAt.getTime() + CODE_COOLDOWN * 1000 - Date.now()) / 1000
      );
      return NextResponse.json(
        { success: false, message: `请 ${remainingTime} 秒后再试` },
        { status: 429 }
      );
    }

    // 生成6位验证码
    const code = generateCode();

    // TODO: 实际对接短信网关（阿里云、腾讯云等）
    // 这里先模拟发送成功
    const smsSent = await sendSms(phone, code);

    if (!smsSent) {
      return NextResponse.json(
        { success: false, message: '短信发送失败，请稍后重试' },
        { status: 500 }
      );
    }

    // 存储验证码（生产环境应加密存储）
    await prisma.smsCode.create({
      data: {
        phone,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10分钟过期
      },
    });

    // 开发环境返回验证码方便测试
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        message: '验证码已发送',
        devCode: code, // 开发环境返回验证码
      });
    }

    return NextResponse.json({
      success: true,
      message: '验证码已发送',
    });
  } catch (error) {
    console.error('发送验证码失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
