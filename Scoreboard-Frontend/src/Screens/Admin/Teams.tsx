import { useRef, useState, useContext } from "react";
import TeamRow from "./components/TeamRow";
import { Team } from "../../types/Team";
import API from "../../Utilities/ApiEndpoints";
import { useAuthHeader } from "react-auth-kit";
import TeamLogo from "../../components/TeamLogo";
import { ToastContext } from "../../Utilities/ToastContext";

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
	const getAccessToken = useAuthHeader();
	const setToast = useContext(ToastContext).setToastMessage;
	const [teamName, setTeamName] = useState("");
	const [teamLogo, setTeamLogo] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);

	const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			console.log("Uploading logo:", file.name, file.type, file.size);
			const res = await API.UploadLogo(getAccessToken(), file);
			console.log("Upload response:", res.data);
			setTeamLogo(res.data.logoUrl);
			setToast("Logo Uploaded Successfully");
		} catch (error: any) {
			console.error("Upload error:", error);
			const errorMsg = error.response?.data?.message || error.message || "Failed to upload logo";
			setToast(`Upload failed: ${errorMsg}`);
		} finally {
			setUploading(false);
		}
	};

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
							<label>Team Logo URL</label>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
									<TeamLogo src={teamLogo} name={teamName} size={60} />
									<div style={{ flex: 1 }}>
										<input
											name="LogoUrl"
											value={teamLogo}
											onChange={(e) => setTeamLogo(e.target.value)}
											className="styledInput"
											placeholder="Paste image URL here (e.g., https://i.imgur.com/example.png)"
											style={{ width: '100%', fontSize: '14px', padding: '10px' }}
										/>
										<span style={{ fontSize: '11px', color: '#888', display: 'block', marginTop: '5px' }}>
											💡 Tip: Right-click any image online → "Copy image address" → Paste here
										</span>
									</div>
								</div>
							</div>
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
