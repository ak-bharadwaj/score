import { UserRole } from "../types/UserRole";
import "./UserRoleChip.css";

const UserRoleChip = ({ role }: { role: UserRole }) => {
	return (
		<span
			style={{ backgroundColor: role === UserRole.ADMIN ? "red" : "green" }}
			className="chip"
		>
			{role}
		</span>
	);
};

export default UserRoleChip;
