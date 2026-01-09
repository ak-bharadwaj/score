import { SocketServer } from "../types/SocketServer";

export const addSocketEvents = () =>
  SocketServer.io.on("connection", socket => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("subscribe", room => {
      socket.join(room);
    });

    socket.on("unsubscribe", room => {
      socket.leave(room);
    });

    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

export const emitInRoom = <T>(room: string, data: T) => SocketServer.io.sockets.in(room).emit(JSON.stringify(data));
