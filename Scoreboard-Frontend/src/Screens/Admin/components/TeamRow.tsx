import { Team } from "../../../types/Team";

const TeamRow = ({
	team,
	onDelete,
	onEdit,
}: {
	team: Team;
	onDelete: (teamToDelete: Team) => void;
	onEdit: (teamToEdit: Team) => void;
}) => {
	return (
		<tr>
			<td>{team.name}</td>
			<td>
				<button onClick={() => onEdit(team)} className="styledButton" style={{ marginRight: '5px' }}>
					Edit
				</button>
				<button onClick={() => onDelete(team)} className="styledButton">
					Delete
				</button>
			</td>
		</tr>
	);
};

export default TeamRow;
