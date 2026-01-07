import { UserRole } from "./UserRole";

export interface User {
  name: string;
  username: string;
  password: string;
  role: UserRole;
}
