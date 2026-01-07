import { useRef, useState } from "react";
import TeamRow from "./components/TeamRow";
import { Team } from "../../types/Team";

const Teams = ({
	teams,
	onTeamAdd,
	onTeamDelete,
}: {
	teams: Team[];
	onTeamAdd: (teamToAdd: Team) => void;
	onTeamDelete: (teamToDelete: Team) => void;
}) => {
	const addTeamDialog = useRef<HTMLDialogElement | null>(null);
	const confirmDeleteDialog = useRef<HTMLDialogElement | null>(null);
	const [newTeamName, setNewTeamName] = useState("");
	const [teamToDelete, setTeamToDelete] = useState<Team>();
	const [errorMsg, setErrorMsg] = useState("");

	const openDialog = () => {
		addTeamDialog.current?.showModal();
	};
	const closeDialog = () => {
		addTeamDialog.current?.close();
		confirmDeleteDialog.current?.close();
	};

	const handleAddTeam = (e: any) => {
		e.preventDefault();
		if (newTeamName === "") {
			setErrorMsg("Enter Name!");
			setTimeout(() => setErrorMsg(""), 3000);
			return;
		}
		onTeamAdd({ name: newTeamName });
		addTeamDialog.current?.close();
	};

	const confirmTeamDelete = (teamToDelete: Team) => {
		setTeamToDelete(teamToDelete);
		confirmDeleteDialog.current?.showModal();
	};

	return (
		<div className="usersContainer">
			<div className="top">
				<button onClick={openDialog} className="styledButton">
					Add Team
				</button>
				<dialog ref={addTeamDialog}>
					<button className="styledButton" onClick={closeDialog}>
						Close
					</button>
					<h3>Add Team Details</h3>
					<form onSubmit={handleAddTeam}>
						<div>
							<label>Name</label>
							<input
								name="Name"
								onChange={(e) => setNewTeamName(e.target.value)}
								value={newTeamName}
								className="styledInput"
							/>
						</div>
						<button className="styledButton" type="submit">
							Add
						</button>
					</form>
					{errorMsg}
				</dialog>
				<dialog ref={confirmDeleteDialog}>
					<button className="styledButton" onClick={closeDialog}>
						Close
					</button>
					<h3>Caution</h3>
					Are you sure you want to Delete
					<br /> <b>{teamToDelete?.name} ?</b>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onTeamDelete(teamToDelete as Team);
							confirmDeleteDialog.current?.close();
							setTeamToDelete(undefined);
						}}
					>
						<button className="styledButton" type="submit">
							Yes
						</button>
					</form>
				</dialog>
			</div>
			<div className="main">
				<table>
					<thead>
						<tr>
							<td>Team Name</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{teams.map((team, i) => (
							<TeamRow key={i} team={team} onDelete={confirmTeamDelete} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Teams;
