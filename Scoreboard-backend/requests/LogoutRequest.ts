import { Token } from "../types/Tokens";

export default interface LogoutRequest {
  refreshToken: Token;
}
