import { Request } from "express";

import { User } from "../types/User";

export default interface AuthenticatedRequest extends Request {
  user?: User;
}
