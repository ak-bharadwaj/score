import { SocketServer } from "../types/SocketServer";

export const addSocketEvents = () =>
  SocketServer.io.on("connection", socket => {
    socket.on("subscribe", room => {
      socket.join(room);
    });

    socket.on("unsubscribe", room => {
      socket.leave(room);
    });
  });

export const emitInRoom = <T>(room: string, data: T) => SocketServer.io.sockets.in(room).emit(JSON.stringify(data));
