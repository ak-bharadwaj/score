import { Token } from "../types/Tokens";

export default interface AccessTokenRequest {
  refreshToken: Token;
}
