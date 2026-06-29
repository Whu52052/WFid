// ============================================================================
// 短信服务工具
// 支持对接阿里云、腾讯云等短信网关
// ============================================================================

// 生成6位随机验证码
export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// TODO: 实现实际的短信发送逻辑
// 接入阿里云短信服务
export async function sendSmsAlibaba(phone: string, code: string): Promise<boolean> {
  // const { ALIYUN_ACCESS_KEY, ALIYUN_ACCESS_SECRET, ALIYUN_SIGN_NAME, ALIYUN_TEMPLATE_CODE } = process.env;
  // 接入阿里云SDK实现短信发送
  // ...
  return true;
}

// TODO: 接入腾讯云短信服务
export async function sendSmsTencent(phone: string, code: string): Promise<boolean> {
  // const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY, TENCENT_APP_ID, TENCENT_SIGN } = process.env;
  // 接入腾讯云SDK实现短信发送
  // ...
  return true;
}

// 统一短信发送接口（根据配置选择服务商）
export async function sendSms(phone: string, code: string): Promise<boolean> {
  // 在开发环境模拟发送
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SMS Mock] 发送验证码 ${code} 到 ${phone}`);
    return true;
  }

  // 根据配置选择短信服务商
  const provider = process.env.SMS_PROVIDER || 'aliyun';

  try {
    switch (provider) {
      case 'tencent':
        return await sendSmsTencent(phone, code);
      case 'aliyun':
      default:
        return await sendSmsAlibaba(phone, code);
    }
  } catch (error) {
    console.error('短信发送失败:', error);
    return false;
  }
}
