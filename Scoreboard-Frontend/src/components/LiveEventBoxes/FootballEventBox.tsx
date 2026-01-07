import { StartingDate } from "../../App";
import FootballEvent, { FootballScore } from "../../types/FootballEvent";
import "./LiveEventBox.css";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const FootballEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: FootballScore) => void;
	event: FootballEvent;
}) => {
	return (
		<div className="liveEventBox">
			<span className="eventCategory">
				<SportsSoccerIcon />
				Football
			</span>
			<div className="event-header-compact">
				<h3 className="fjalla">{event.title}</h3>
				<p>{event.subtitle}</p>
			</div>

			<div className="footballScoresContainer">
				<div className="score-row">
					<div className="team-info">
						{event.teams[0].logoUrl && <img src={event.teams[0].logoUrl} alt="" className="team-logo-mini" />}
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
						{event.teams[1].logoUrl && <img src={event.teams[1].logoUrl} alt="" className="team-logo-mini" />}
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

export default FootballEventBox;
