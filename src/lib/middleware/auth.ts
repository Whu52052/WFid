// ============================================================================
// 认证中间件
// 保护需要登录的 API 路由
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

export interface AuthContext {
  userId: string;
  phone: string;
}

// 认证上下文获取函数
export async function getAuthContext(request: NextRequest): Promise<AuthContext | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return {
    userId: payload.userId,
    phone: payload.phone,
  };
}

// 受保护的 API 路由包装器
export function withAuth(
  handler: (request: NextRequest, context: AuthContext) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authContext = await getAuthContext(request);

    if (!authContext) {
      return NextResponse.json(
        { success: false, message: '请先登录' },
        { status: 401 }
      );
    }

    return handler(request, authContext);
  };
}
