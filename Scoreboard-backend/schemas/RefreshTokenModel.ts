import { Schema, model } from "mongoose";

import { RefreshToken } from "../types/Tokens";

const refreshTokenSchema = new Schema<RefreshToken>({
  refreshToken: {
    type: String,
    required: true,
  },
});

const RefreshTokenModel = model("RefreshTokens", refreshTokenSchema);

export default RefreshTokenModel;
