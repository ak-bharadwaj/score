import { StartingDate } from "../../App";
import EventCatagories from "../../types/EventCategories";
import SquashEvent, { SquashScore } from "../../types/SquashEvent";
import "./LiveEventBox.css";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

const SquashEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: SquashScore) => void;
	event: SquashEvent;
}) => {
	return (
		<div className="liveEventBox squash">
			<span className="eventCategory">
				<SportsTennisIcon />
				<span>
					{event.event === EventCatagories.SQUASH_MEN
						? "Men's Squash"
						: "Women's Squash"}
				</span>
			</span>
			<div className="event-header-compact">
				<h3 className="fjalla">{event.title}</h3>
				<p>{event.subtitle}</p>
			</div>

			<div className="footballScoresContainer">
				<div className="score-row">
					<div className="team-info">
						<h3 className="team-name-compact fjalla">{event.teams[0].name}</h3>
					</div>
					<div className="score-display-mini fjalla">{event.score.teamA_points}</div>
					{isAdmin && (
						<div className="admin-score-controls">
							<button onClick={() => onScoreUpdate!({ ...event.score, teamA_points: event.score.teamA_points - 1 })} className="styledButton">-</button>
							<input
								type="number"
								className="styledInput"
								value={event.score.teamA_points}
								onChange={(e) => onScoreUpdate!({ ...event.score, teamA_points: Number(e.target.value) })}
							/>
							<button onClick={() => onScoreUpdate!({ ...event.score, teamA_points: event.score.teamA_points + 1 })} className="styledButton">+</button>
						</div>
					)}
				</div>

				<div className="score-row">
					<div className="team-info">
						<h3 className="team-name-compact fjalla">{event.teams[1].name}</h3>
					</div>
					<div className="score-display-mini fjalla">{event.score.teamB_points}</div>
					{isAdmin && (
						<div className="admin-score-controls">
							<button onClick={() => onScoreUpdate!({ ...event.score, teamB_points: event.score.teamB_points - 1 })} className="styledButton">-</button>
							<input
								type="number"
								className="styledInput"
								value={event.score.teamB_points}
								onChange={(e) => onScoreUpdate!({ ...event.score, teamB_points: Number(e.target.value) })}
							/>
							<button onClick={() => onScoreUpdate!({ ...event.score, teamB_points: event.score.teamB_points + 1 })} className="styledButton">+</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SquashEventBox;
