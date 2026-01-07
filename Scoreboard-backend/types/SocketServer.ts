import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export namespace SocketServer {
  export let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}
