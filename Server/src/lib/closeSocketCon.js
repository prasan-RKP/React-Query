import { io, server } from "./socket.js"; // Adjust path if needed

console.log("Closing all active socket connections...");

io.sockets.sockets.forEach((socket) => {
  socket.emit("forceDisconnect");  // Tell clients to stop reconnecting
  socket.disconnect(true);
});

io.close();
server.close(() => {
  console.log("Server closed.");
  process.exit(0);
});
