import { Express } from "express";
import { Server } from "socket.io";

import { connectToDatabase } from "./DatabaseUtils";
import { addSocketEvents } from "./SocketUtils";
import { SocketServer } from "../types/SocketServer";
import { CorsConfig } from "../config/CorsConfig";

const PORT = process.env.PORT || 5000;

export const createAndStartServer = async (app: Express) => {
  await connectToDatabase();
  const server = app.listen(PORT, () => console.log("[S] Server started at port: " + PORT));
  const _io = new Server(server, { cors: CorsConfig });
  SocketServer.io = _io;
  addSocketEvents();
};
