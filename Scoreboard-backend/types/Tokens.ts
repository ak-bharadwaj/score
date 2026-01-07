export type Token = string;

export enum AccessTokenTypes {
  BASIC = "Basic",
  BEARER = "Bearer",
}

export interface AccessToken {
  type: AccessTokenTypes;
  accessToken: Token;
}

export interface RefreshToken {
  refreshToken: Token;
}
