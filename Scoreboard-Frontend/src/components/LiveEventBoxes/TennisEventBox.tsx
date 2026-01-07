import { StartingDate } from "../../App";
import EventCatagories from "../../types/EventCategories";
import TennisEvent, { TennisScore } from "../../types/TennisEvent";
import "./LiveEventBox.css";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

const TennisEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: TennisScore) => void;
	event: TennisEvent;
}) => {
	return (
		<div className="liveEventBox tennis">
			<span className="eventCategory">
				<SportsTennisIcon />
				<span>
					{event.event === EventCatagories.TENNIS_MEN
						? "Men's Tennis"
						: "Women's Tennis"}
				</span>
			</span>
			<div className="event-header-compact">
				<h3 className="fjalla">{event.title} | {event.matchType}</h3>
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

export default TennisEventBox;
