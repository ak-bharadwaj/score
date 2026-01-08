import ChessEvent, { ChessScore } from "../../types/ChessEvent";
import "./LiveEventBox.css";
import GridOnIcon from "@mui/icons-material/GridOn";
import TeamLogo from "../TeamLogo";
import { getEventGender } from "../../types/EventCategories";

const ChessEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: ChessScore) => void;
	event: ChessEvent;
}) => {
	const gender = getEventGender(event);

	return (
		<div className={`liveEventBox chess ${gender}`}>
			<span className="eventCategory">
				<GridOnIcon />
				Chess
			</span>
			{gender !== "unknown" && (
				<div className="gender-tag-container">
					<span className="gender-tag">{gender === "men" ? "MEN" : "WOMEN"}</span>
				</div>
			)}
			<div className="event-header-compact">
				<h3 className="fjalla">{event.title}</h3>
				<p>{event.subtitle}</p>
			</div>

			<div className="footballScoresContainer">
				<div className="score-row">
					<div className="team-info">
						<TeamLogo src={event.teams[0].logoUrl} name={event.teams[0].name} size={28} />
						<h3 className="team-name-compact fjalla">{event.teams[0].name}</h3>
					</div>
					<div className="score-display-mini fjalla">{event.score.teamA_points}</div>
					{isAdmin && (
						<div className="admin-score-controls">
							<button onClick={() => onScoreUpdate!({ ...event.score, teamA_points: event.score.teamA_points - 0.5 })} className="styledButton">-</button>
							<input
								type="number"
								step="0.5"
								className="styledInput"
								value={event.score.teamA_points}
								onChange={(e) => onScoreUpdate!({ ...event.score, teamA_points: Number(e.target.value) })}
							/>
							<button onClick={() => onScoreUpdate!({ ...event.score, teamA_points: event.score.teamA_points + 0.5 })} className="styledButton">+</button>
						</div>
					)}
				</div>

				<div className="score-row">
					<div className="team-info">
						<TeamLogo src={event.teams[1].logoUrl} name={event.teams[1].name} size={28} />
						<h3 className="team-name-compact fjalla">{event.teams[1].name}</h3>
					</div>
					<div className="score-display-mini fjalla">{event.score.teamB_points}</div>
					{isAdmin && (
						<div className="admin-score-controls">
							<button onClick={() => onScoreUpdate!({ ...event.score, teamB_points: event.score.teamB_points - 0.5 })} className="styledButton">-</button>
							<input
								type="number"
								step="0.5"
								className="styledInput"
								value={event.score.teamB_points}
								onChange={(e) => onScoreUpdate!({ ...event.score, teamB_points: Number(e.target.value) })}
							/>
							<button onClick={() => onScoreUpdate!({ ...event.score, teamB_points: event.score.teamB_points + 0.5 })} className="styledButton">+</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChessEventBox;
