const express = require('express');
const cors = require('cors');
const path = require('path');
const novelRouter = require('../routes/novelRouter.cjs');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET"],
  credentials: true
}));

// Sử dụng routes - thêm đường dẫn prefix
app.use('/api/novels', novelRouter);

const server = app.listen(PORT, () => {
  console.log(`Novel Server is running on port ${PORT}`);
});

// Cập nhật xử lý graceful shutdown
const shutdown = () => {
  console.log('\nReceived kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Novel Server closed');
    process.exit(0);
  });
  
  // Nếu server không đóng trong vòng 5s, force exit
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 5000);
};

// Xử lý các tín hiệu tắt server
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGHUP', shutdown);

// Bắt lỗi không xử lý được
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown();
});