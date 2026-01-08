import EventCatagories, { getEventGender } from "../../types/EventCategories";
import SquashEvent, { SquashScore } from "../../types/SquashEvent";
import "./LiveEventBox.css";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TeamLogo from "../TeamLogo";

const SquashEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: SquashScore) => void;
	event: SquashEvent;
}) => {
	const gender = getEventGender(event);

	return (
		<div className={`liveEventBox squash ${gender}`}>
			<span className="eventCategory">
				<SportsTennisIcon />
				Squash
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
						<TeamLogo src={event.teams[1].logoUrl} name={event.teams[1].name} size={28} />
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
