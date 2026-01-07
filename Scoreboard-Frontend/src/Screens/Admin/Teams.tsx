import { useRef, useState } from "react";
import TeamRow from "./components/TeamRow";
import { Team } from "../../types/Team";

const Teams = ({
	teams,
	onTeamAdd,
	onTeamDelete,
	onTeamUpdate
}: {
	teams: Team[];
	onTeamAdd: (teamToAdd: Team) => void;
	onTeamDelete: (teamToDelete: Team) => void;
	onTeamUpdate: (id: string, teamToUpdate: Partial<Team>) => void;
}) => {
	const addTeamDialog = useRef<HTMLDialogElement | null>(null);
	const confirmDeleteDialog = useRef<HTMLDialogElement | null>(null);
	const [teamName, setTeamName] = useState("");
	const [teamLogo, setTeamLogo] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);

	const [teamToDelete, setTeamToDelete] = useState<Team>();
	const [errorMsg, setErrorMsg] = useState("");

	const openDialog = () => {
		setEditingId(null);
		setTeamName("");
		setTeamLogo("");
		addTeamDialog.current?.showModal();
	};
	const closeDialog = () => {
		addTeamDialog.current?.close();
		confirmDeleteDialog.current?.close();
	};

	const handleSave = (e: any) => {
		e.preventDefault();
		if (teamName === "") {
			setErrorMsg("Enter Name!");
			setTimeout(() => setErrorMsg(""), 3000);
			return;
		}

		if (editingId) {
			onTeamUpdate(editingId, { name: teamName, logoUrl: teamLogo });
		} else {
			onTeamAdd({ name: teamName, logoUrl: teamLogo });
		}
		addTeamDialog.current?.close();
	};

	const handleEdit = (team: Team) => {
		setEditingId(team._id || null);
		setTeamName(team.name);
		setTeamLogo(team.logoUrl || "");
		addTeamDialog.current?.showModal();
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
					<h3>{editingId ? "Edit Team" : "Add Team Details"}</h3>
					<form onSubmit={handleSave}>
						<div>
							<label>Name</label>
							<input
								name="Name"
								onChange={(e) => setTeamName(e.target.value)}
								value={teamName}
								className="styledInput"
							/>
						</div>
						<div style={{ marginTop: '10px' }}>
							<label>Logo URL (Optional)</label>
							<input
								name="LogoUrl"
								value={teamLogo}
								onChange={(e) => setTeamLogo(e.target.value)}
								className="styledInput"
								placeholder="https://..."
							/>
						</div>
						<button className="styledButton" type="submit">
							{editingId ? "Update" : "Add"}
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
							<TeamRow key={i} team={team} onDelete={confirmTeamDelete} onEdit={handleEdit} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Teams;
