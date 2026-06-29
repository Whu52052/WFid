// ============================================================================
// 更新用户信息
// PUT /api/user/profile
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { withAuth, AuthContext } from '@/lib/middleware/auth';

async function handler(request: NextRequest, context: AuthContext) {
  try {
    const { nickname, avatar, preferences } = await request.json();

    // 更新用户基本信息
    const updateData: Record<string, unknown> = {};
    if (nickname !== undefined) updateData.nickname = nickname;
    if (avatar !== undefined) updateData.avatar = avatar;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: context.userId },
        data: updateData,
      });
    }

    // 更新偏好设置
    if (preferences) {
      await prisma.userPreferences.upsert({
        where: { userId: context.userId },
        create: { userId: context.userId, ...preferences },
        update: preferences,
      });
    }

    return NextResponse.json({
      success: true,
      message: '更新成功',
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(handler);
