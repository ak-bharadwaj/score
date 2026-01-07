import { Team } from "../../../types/Team";

const TeamRow = ({
	team,
	onDelete,
}: {
	team: Team;
	onDelete: (teamToDelete: Team) => void;
}) => {
	return (
		<tr>
			<td>{team.name}</td>
			<td>
				<button onClick={() => onDelete(team)} className="styledButton">
					Delete
				</button>
			</td>
		</tr>
	);
};

export default TeamRow;
