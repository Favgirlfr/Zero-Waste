const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/food');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/food', foodRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const pickupRoutes = require('./routes/pickup');
app.use('/api/pickup', pickupRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
const notificationRoutes = require('./routes/notification');
app.use('/api/notifications', notificationRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const donationsRoutes = require('./routes/donations');
app.use('/api/donations', donationsRoutes);
const recipientRoutes = require("./routes/recipient");
app.use("/api/recipient", recipientRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
});
// Placeholder route
app.get('/', (req, res) => {
  res.send('Zero Waste API is running...');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH']
  }
});

const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  //Emit test message to frontend
  socket.emit('test-message', { message: 'Hello from backend!' });
  console.log(`Sent test-message to socket ${socket.id}`);

  socket.on('registerUser', (userId) => {
    connectedUsers[userId] = socket.id;
    console.log('Registered user:', userId, 'with socket ID:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

// Make io and connectedUsers available to routes/controllers
app.set('io', io);
app.set('connectedUsers', connectedUsers);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    console.log(`${signal} received. Shutting down...`);
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
