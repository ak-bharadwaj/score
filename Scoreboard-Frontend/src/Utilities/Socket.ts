import { io } from "socket.io-client";
import { RootURL } from "./ApiEndpoints";

export const socket = io(RootURL, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    timeout: 20000,
    autoConnect: true,
    forceNew: false,
});
