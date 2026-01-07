import { UserRole } from "./UserRole";

export type User = {
	username: string;
	name: string;
	role: UserRole;
	password?: string;
};
