// ============================================================================
// 测试记录 API
// POST /api/tests/records - 保存测试记录
// GET /api/tests/records - 获取测试记录列表
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { withAuth, AuthContext } from '@/lib/middleware/auth';

// 保存测试记录
export async function POST(request: NextRequest, context: AuthContext) {
  try {
    const { testId, sessionId, resultType, resultTitle, resultEmoji, resultData, isPremium } =
      await request.json();

    // 检查是否已存在相同session的记录（防止重复提交）
    const exists = await prisma.testRecord.findFirst({
      where: { userId: context.userId, sessionId },
    });

    if (exists) {
      return NextResponse.json({
        success: true,
        message: '记录已存在',
        data: { id: exists.id },
      });
    }

    const record = await prisma.testRecord.create({
      data: {
        userId: context.userId,
        testId,
        sessionId,
        resultType,
        resultTitle,
        resultEmoji,
        resultData: JSON.stringify(resultData),
        isPremium: isPremium || false,
      },
    });

    return NextResponse.json({
      success: true,
      message: '保存成功',
      data: { id: record.id },
    });
  } catch (error) {
    console.error('保存测试记录失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}

// 获取测试记录列表
export async function GET(request: NextRequest, context: AuthContext) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const testId = searchParams.get('testId');

    const where: Record<string, unknown> = { userId: context.userId };
    if (testId) where.testId = testId;

    const [records, total] = await Promise.all([
      prisma.testRecord.findMany({
        where,
        orderBy: { completedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.testRecord.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        records: records.map(r => ({
          ...r,
          resultData: JSON.parse(r.resultData),
        })),
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    });
  } catch (error) {
    console.error('获取测试记录失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
