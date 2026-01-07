import { io } from "socket.io-client";
import { RootURL } from "./ApiEndpoints";

export const socket = io(RootURL);
