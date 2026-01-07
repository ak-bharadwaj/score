import * as jwt from "jsonwebtoken";
import LoginWithUsernameAndPasswordRequest from "../requests/LoginWithUsernameAndPasswordRequest";
import AccessTokenRequest from "../requests/AccessTokenRequest";
import RefreshTokenModel from "../schemas/RefreshTokenModel";
import { Body, Delete, Post, Response, Route, Tags } from "tsoa";

import LogoutRequest from "../requests/LogoutRequest";
import { getAccessToken, getRefreshToken, loginWithUsernameAndPassword, revokeRefreshToken } from "../utils/AuthUtils";
import { Unauthorised } from "../utils/AuthErrors";
import { User } from "../types/User";

@Route("api/auth")
@Tags("Authentication")
export class AuthController {
  /**
   * Logs in a user with their username and password.
   * @param {LoginWithUsernameAndPasswordRequest} request - The request object containing the username and password.
   */
  @Post("loginWithUsernameAndPassword")
  @Response(403, "Invalid username or password")
  public async loginWithUsernameAndPassword(@Body() { username, password }: LoginWithUsernameAndPasswordRequest) {
    return await loginWithUsernameAndPassword(username, password);
  }

  /**
   * Generates a new access and refresh token using the provided refresh token.
   * @param {AccessTokenRequest} request - The request object containing the refresh token.
   * @throws {Unauthorised} - If the provided refresh token is invalid.
   */
  @Post("accessToken")
  @Response(403, "Invalid Refresh token")
  public async accessToken(@Body() { refreshToken }: AccessTokenRequest) {
    const tokenExists = await RefreshTokenModel.findOne({ refreshToken });

    if (!tokenExists) throw Unauthorised;

    let user = jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET as string);
    user = user as User;
    delete user?.iat;
    const accessToken = getAccessToken(user as User);
    const newRefreshToken = await getRefreshToken(user as User);
    await revokeRefreshToken({ refreshToken });
    return { ...accessToken, refreshToken: newRefreshToken.refreshToken };
  }

  /**
   * Logs out the user by revoking the provided refresh token.
   * @param refreshToken - The refresh token to revoke.
   */
  @Delete("logout")
  public async logout(@Body() { refreshToken }: LogoutRequest) {
    await revokeRefreshToken({ refreshToken });
  }
}
