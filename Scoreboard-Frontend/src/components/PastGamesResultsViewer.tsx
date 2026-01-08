import AthleticsEvent from "../types/AthleticsEvent";
import CricketEvent from "../types/CricketEvent";
import Event from "../types/Event";
import EventCatagories, { formatEventName, getEventGender } from "../types/EventCategories";
import TennisEvent from "../types/TennisEvent";
import AthleticsGamesResultLog from "./AthleticsGamesResultLog";
import CricketGameResultLog from "./CricketGameResultLog";
import TeamLogo from "./TeamLogo";
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
	const gender = getEventGender(event);

	return (
		<div className={`result-card fjalla ${gender}`}>
			{gender !== "unknown" && (
				<div className="past-gender-badge">
					{gender === "men" ? "MEN" : "WOMEN"}
				</div>
			)}
			<div className="result-card-header">
				<span className="event-type">{formatEventName(event.event)}</span>
				<span className="event-title">{event.title}</span>
			</div>
			<div className="result-card-body horizontal-compact">
				<div className={`team-side left ${winnerId === teamA?._id ? "win" : ""}`}>
					<TeamLogo src={teamA?.logoUrl} name={teamA?.name || ""} size={26} />
					<span className="t-name">{teamA?.name}</span>
					<span className="t-score">{score?.teamA_points ?? "0"}</span>
				</div>
				<div className="divider">-</div>
				<div className={`team-side right ${winnerId === teamB?._id ? "win" : ""}`}>
					<span className="t-score">{score?.teamB_points ?? "0"}</span>
					<span className="t-name">{teamB?.name}</span>
					<TeamLogo src={teamB?.logoUrl} name={teamB?.name || ""} size={26} />
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
