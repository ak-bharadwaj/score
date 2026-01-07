import { useRef, useState } from "react";
import { User } from "../../types/User";
import "./Users.css";
import { UserRole } from "../../types/UserRole";
import UserRow from "./components/UserRow";

const Users = ({
	users,
	onDelete,
	onUserAdd,
}: {
	users: User[];
	onDelete: (userToDelete: User) => void;
	onUserAdd: (userToAdd: User, password: string) => void;
}) => {
	const [newName, setNewName] = useState("");
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [newRole, setNewRole] = useState(UserRole.SCORE_EDITOR);

	const addUserDialog = useRef<HTMLDialogElement | null>(null);

	const openDialog = () => {
		addUserDialog.current?.showModal();
		setNewName("");
		setNewUsername("");
		setNewPassword("");
	};
	const closeDialog = () => {
		addUserDialog.current?.close();
	};

	const handleAddUser = (e: any) => {
		e.preventDefault();
		if (newName === "" || newUsername === "" || newPassword === "") {
			setErrorMsg("Enter Name, Username and Password!");
			setTimeout(() => setErrorMsg(""), 3000);
			return;
		}
		onUserAdd(
			{ name: newName, username: newUsername, role: newRole },
			newPassword
		);
		addUserDialog.current?.close();
	};

	return (
		<div className="usersContainer">
			<section className="top">
				<button onClick={openDialog} className="styledButton">
					Add User
				</button>
				<dialog ref={addUserDialog}>
					<button className="styledButton" onClick={closeDialog}>
						Close
					</button>
					<h3>Add User Details</h3>
					<form onSubmit={handleAddUser}>
						<div>
							<label>Name</label>
							<input
								name="Name"
								onChange={(e) => setNewName(e.target.value)}
								value={newName}
								className="styledInput"
							/>
						</div>
						<div>
							<label>Username</label>
							<input
								name="Username"
								onChange={(e) => setNewUsername(e.target.value)}
								value={newUsername}
								className="styledInput"
							/>
						</div>
						<div>
							<label>Password</label>
							<input
								name="Password"
								onChange={(e) => setNewPassword(e.target.value)}
								value={newPassword}
								className="styledInput"
							/>
						</div>
						<div>
							<label>Role</label>
							<select
								onChange={(e) => setNewRole(e.target.value as UserRole)}
								value={newRole}
								className="styledButton dropdown"
							>
								<option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
								<option value={UserRole.SCORE_EDITOR}>
									{UserRole.SCORE_EDITOR}
								</option>
							</select>
						</div>
						<button className="styledButton" type="submit">
							Add
						</button>
					</form>
					{errorMsg}
				</dialog>
			</section>
			<section className="main">
				<table>
					<thead>
						<tr>
							<td>Name</td>
							<td>Username</td>
							<td>Role</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{users.map((user, i) => (
							<UserRow key={i} user={user} onDelete={onDelete} />
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default Users;
