require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('sendMessage', async (data) => {
    const { recipientId, message } = data;
    io.to(recipientId).emit('newMessage', message);
  });

  socket.on('notification', (data) => {
    const { recipientId, notification } = data;
    io.to(recipientId).emit('newNotification', notification);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tiles', require('./routes/tiles'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/search', require('./routes/search'));

// Asset Management Routes
app.use('/api/assets', require('./routes/assets'));
app.use('/api/crypto', require('./routes/crypto'));
app.use('/api/real-estate', require('./routes/realEstate'));
app.use('/api/cash', require('./routes/cash'));
app.use('/api/stocks', require('./routes/stocks'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 