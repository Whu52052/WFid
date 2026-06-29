// ============================================================================
// 验证短信验证码并登录/注册
// POST /api/auth/login
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { generateToken, verifyToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();

    // 验证参数
    if (!phone || !code) {
      return NextResponse.json(
        { success: false, message: '手机号和验证码不能为空' },
        { status: 400 }
      );
    }

    // 查找有效验证码
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
      return NextResponse.json(
        { success: false, message: '验证码错误或已过期' },
        { status: 401 }
      );
    }

    // 标记验证码已使用
    await prisma.smsCode.update({
      where: { id: smsRecord.id },
      data: { used: true },
    });

    // 查找或创建用户
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // 新用户注册
      user = await prisma.user.create({
        data: {
          phone,
          nickname: `用户${phone.slice(-4)}`, // 默认昵称
        },
      });

      // 创建默认偏好设置
      await prisma.userPreferences.create({
        data: { userId: user.id },
      });
    }

    // 生成JWT token
    const token = generateToken({
      userId: user.id,
      phone: user.phone,
    });

    // 返回用户信息和token
    return NextResponse.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          phone: user.phone,
          nickname: user.nickname,
          avatar: user.avatar,
          isVIP: user.isVIP,
          vipExpiry: user.vipExpiry,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
