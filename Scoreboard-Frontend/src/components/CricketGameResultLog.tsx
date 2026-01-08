import CricketEvent from "../types/CricketEvent";
import { getEventGender } from "../types/EventCategories";

const CricketGameResultLog = ({ event }: { event: CricketEvent }) => {
	const gender = getEventGender(event);

	return (
		<div className={`result-card fjalla ${gender}`}>
			{gender !== "unknown" && (
				<div className="past-gender-badge">
					{gender === "men" ? "MEN" : "WOMEN"}
				</div>
			)}
			<div className="result-card-header">
				<span className="event-type">{event.event}</span>
				<span className="event-title">{event.title}</span>
			</div>
			<div className="result-card-body">
				<div className="team-result">
					<img src={event.teams[0].logoUrl || "/placeholder-logo.png"} alt={event.teams[0].name} className="result-logo" />
					<div className="team-info-stack">
						<span className="team-name">{event.teams[0].name}</span>
						<span className="team-score-sub">{event.score.teamA_runs}/{event.score.teamA_wickets}</span>
					</div>
				</div>
				<div className="vs-divider">VS</div>
				<div className="team-result">
					<div className="team-info-stack" style={{ alignItems: 'flex-end' }}>
						<span className="team-name">{event.teams[1].name}</span>
						<span className="team-score-sub">{event.score.teamB_runs}/{event.score.teamB_wickets}</span>
					</div>
					<img src={event.teams[1].logoUrl || "/placeholder-logo.png"} alt={event.teams[1].name} className="result-logo" />
				</div>
			</div>
			<div className="result-card-footer">
				<div className="winner-announcement" style={{ marginBottom: '8px' }}>
					{event.winner?.team ? `${event.winner.team.name} WON` : "MATCH CONCLUDED"}
				</div>
				<a target="blank" href={event.eventLink} className="view-details-link">
					VIEW MATCH DETAILS
				</a>
			</div>
		</div>
	);
};

export default CricketGameResultLog;
