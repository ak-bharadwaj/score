import AthleticsEvent from "../types/AthleticsEvent";
import CricketEvent from "../types/CricketEvent";
import Event from "../types/Event";
import EventCatagories, { formatEventName } from "../types/EventCategories";
import TennisEvent from "../types/TennisEvent";
import AthleticsGamesResultLog from "./AthleticsGamesResultLog";
import CricketGameResultLog from "./CricketGameResultLog";
import "./PastGamesResultsViewer.css";

const PastGamesResultsViewer = ({ events }: { events: Event[] }) => {
	return (
		<div
			className={events.length === 0 ? "wire rightContainer" : "rightContainer"}
		>
			{events.length === 0 ? (
				<>Past Games Results</>
			) : (
				<>
					<h3
						style={{ marginTop: "0.5em", marginBlockEnd: "0.5em" }}
						className="wire"
					>
						Recent Updates
					</h3>
					<section className="resultsLogsContainer">
						{events.map((e, i) => (
							<ResultLog key={i} event={e} />
						))}
					</section>
				</>
			)}
		</div>
	);
};

export default PastGamesResultsViewer;

const ResultLog = ({ event }: { event: Event }) => {
	const isAthletics = event.event === EventCatagories.ATHLETICS;
	const isCricket = event.event === EventCatagories.CRICKET;

	if (isAthletics)
		return <AthleticsGamesResultLog event={event as AthleticsEvent} />;
	if (isCricket)
		return <CricketGameResultLog event={event as CricketEvent} />;

	const score = (event as any).score;
	const teamA = event.teams[0];
	const teamB = event.teams[1];
	const winnerId = event.winner?.team?._id;

	return (
		<div className="result-card fjalla">
			<div className="result-card-header">
				<span className="event-type">{formatEventName(event.event)}</span>
				<span className="event-title">{event.title}</span>
			</div>
			<div className="result-card-body">
				<div className={`team-result ${winnerId === teamA?._id ? "is-winner" : ""}`}>
					<img src={teamA?.logoUrl || "/placeholder-logo.png"} alt={teamA?.name} className="result-logo" />
					<span className="team-name">{teamA?.name}</span>
					<span className="team-score">{score?.teamA_points ?? "-"}</span>
				</div>
				<div className="vs-divider">VS</div>
				<div className={`team-result ${winnerId === teamB?._id ? "is-winner" : ""}`}>
					<span className="team-score">{score?.teamB_points ?? "-"}</span>
					<span className="team-name">{teamB?.name}</span>
					<img src={teamB?.logoUrl || "/placeholder-logo.png"} alt={teamB?.name} className="result-logo" />
				</div>
			</div>
			<div className="result-card-footer">
				{event.winner?.team ? (
					<span className="winner-announcement">{event.winner.team.name} WON</span>
				) : (
					<span className="winner-announcement">DRAW</span>
				)}
			</div>
		</div>
	);
};
