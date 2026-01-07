import { useState } from "react";
import UserRoleChip from "../../../components/UserRoleChip";
import { User } from "../../../types/User";

const UserRow = ({
	user,
	onDelete,
}: {
	user: User;
	onDelete: (userToDelete: User) => void;
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<tr>
			<td>{user.name}</td>
			<td
				className="noTextTransform"
				onClick={() => {
					setShowPassword(true);
					setTimeout(() => setShowPassword(false), 2000);
				}}
			>
				{showPassword ? user.password : user.username}
			</td>
			<td className="chipCell">
				<UserRoleChip role={user.role} />
			</td>
			<td>
				<button className="styledButton" onClick={() => onDelete(user)}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default UserRow;
