import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import prisma from './utils/prisma.js';
import { socketAuth } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

// CORS
app.use(cors({
  origin: FRONTEND_URL === '*' ? true : FRONTEND_URL.split(','),
  credentials: true,
}));

// 解析 JSON
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ success: true, timestamp: Date.now() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: '接口不存在' });
});

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL === '*' ? true : FRONTEND_URL.split(','),
    credentials: true,
  },
});

// Socket 认证
io.use(socketAuth);

// 在线用户映射
const onlineUsers = new Map(); // userId -> Set<socketId>

io.on('connection', (socket) => {
  const userId = socket.user.id;

  // 加入用户房间
  socket.join(`user:${userId}`);

  // 维护在线列表
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }
  onlineUsers.get(userId).add(socket.id);

  console.log(`用户上线: ${userId} (${socket.id})`);

  // 断开连接
  socket.on('disconnect', () => {
    const userSockets = onlineUsers.get(userId);
    if (userSockets) {
      userSockets.delete(socket.id);
      if (userSockets.size === 0) {
        onlineUsers.delete(userId);
        console.log(`用户下线: ${userId}`);
      }
    }
  });

  // 正在输入
  socket.on('message:typing', ({ userId: targetUserId, isTyping }) => {
    socket.to(`user:${targetUserId}`).emit('message:typing', {
      userId,
      isTyping,
    });
  });
});

// 把 io 挂到 app 上，路由里可以用
app.set('io', io);
app.set('onlineUsers', onlineUsers);

// 启动服务
async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ 数据库连接成功');

    httpServer.listen(PORT, () => {
      console.log(`🚀 服务已启动: http://localhost:${PORT}`);
      console.log(`📡 WebSocket 已就绪`);
    });
  } catch (error) {
    console.error('启动失败:', error);
    process.exit(1);
  }
}

startServer();

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('收到 SIGTERM，正在关闭...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('收到 SIGINT，正在关闭...');
  await prisma.$disconnect();
  process.exit(0);
});
