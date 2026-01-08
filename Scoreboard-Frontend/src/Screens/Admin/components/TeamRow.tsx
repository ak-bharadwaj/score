import { Team } from "../../../types/Team";
import TeamLogo from "../../../components/TeamLogo";

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
			<td>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<TeamLogo src={team.logoUrl} name={team.name} size={30} />
					{team.name}
				</div>
			</td>
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
