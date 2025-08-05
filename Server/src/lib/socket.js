import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// To store logged-in userId & socketId
const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
  console.log('getting Receiver SocketId', userSocketMap[userId]);
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);


  // Store logged-in userId with socket-id
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  console.log('The total loggedInUsers',userSocketMap);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle manual logout event (🔥 FIX)
  socket.on("userDisconnected", (userId) => {
    console.log(`User manually logged out: ${userId}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // Handle automatic disconnection (browser close, etc.)
  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
