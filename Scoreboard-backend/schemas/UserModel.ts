import { Schema, model } from "mongoose";

import { User } from "../types/User";

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserModel = model<User>("Users", userSchema);
export default UserModel;
