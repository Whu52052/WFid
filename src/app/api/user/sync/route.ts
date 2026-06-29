// ============================================================================
// 数据同步 API
// 将前端 localStorage 的数据同步到服务器
// POST /api/user/sync
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { withAuth, AuthContext } from '@/lib/middleware/auth';

interface SyncData {
  testRecords: Array<{
    testId: string;
    sessionId: string;
    resultType: string;
    resultTitle: string;
    resultEmoji: string;
    resultData: unknown;
    completedAt: string;
  }>;
  favorites: string[];
  preferences?: {
    theme?: string;
    language?: string;
    fontSize?: string;
    animations?: boolean;
  };
}

async function handler(request: NextRequest, context: AuthContext) {
  try {
    const syncData: SyncData = await request.json();

    // 1. 同步测试记录
    if (syncData.testRecords?.length > 0) {
      for (const record of syncData.testRecords) {
        const exists = await prisma.testRecord.findFirst({
          where: { userId: context.userId, sessionId: record.sessionId },
        });

        if (!exists) {
          await prisma.testRecord.create({
            data: {
              userId: context.userId,
              testId: record.testId,
              sessionId: record.sessionId,
              resultType: record.resultType,
              resultTitle: record.resultTitle,
              resultEmoji: record.resultEmoji,
              resultData: JSON.stringify(record.resultData),
              completedAt: new Date(record.completedAt),
            },
          });
        }
      }
    }

    // 2. 同步收藏
    if (syncData.favorites?.length > 0) {
      for (const testId of syncData.favorites) {
        await prisma.favoriteTest.upsert({
          where: {
            userId_testId: { userId: context.userId, testId },
          },
          create: { userId: context.userId, testId },
          update: {},
        });
      }
    }

    // 3. 同步偏好设置
    if (syncData.preferences) {
      await prisma.userPreferences.upsert({
        where: { userId: context.userId },
        create: { userId: context.userId, ...syncData.preferences },
        update: syncData.preferences,
      });
    }

    // 返回服务器最新数据
    const [user, serverRecords, serverFavorites] = await Promise.all([
      prisma.user.findUnique({
        where: { id: context.userId },
        include: { preferences: true },
      }),
      prisma.testRecord.findMany({
        where: { userId: context.userId },
        orderBy: { completedAt: 'desc' },
      }),
      prisma.favoriteTest.findMany({
        where: { userId: context.userId },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: '同步成功',
      data: {
        user: {
          id: user?.id,
          phone: user?.phone,
          nickname: user?.nickname,
          avatar: user?.avatar,
          isVIP: user?.isVIP,
          vipExpiry: user?.vipExpiry,
          preferences: user?.preferences,
        },
        testRecords: serverRecords.map(r => ({
          ...r,
          resultData: JSON.parse(r.resultData),
        })),
        favorites: serverFavorites.map(f => f.testId),
      },
    });
  } catch (error) {
    console.error('数据同步失败:', error);
    return NextResponse.json(
      { success: false, message: '同步失败' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
