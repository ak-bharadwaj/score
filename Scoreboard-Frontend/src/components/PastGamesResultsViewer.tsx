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
	const getOppName = (e: Event): string => {
		for (let i = 0; i < e.teams.length; i++) {
			const team = e.teams[i];
			if (team.name !== e.winner?.team?.name) return team.name;
		}
		return "-";
	};
	if (event.event === EventCatagories.ATHLETICS)
		return <AthleticsGamesResultLog event={event as AthleticsEvent} />;
	else if (event.event === EventCatagories.CRICKET)
		return <CricketGameResultLog event={event as CricketEvent} />;
	else {
		if (event.winner?.team === undefined || event.winner?.team === null)
			return (
				<div className="resultLog fjalla">
					{formatEventName(event.event)} {event.title} | {event.subtitle},
					between <span className="winner">{event.teams[0].name}</span> and{" "}
					<span className="winner">{event.teams[1].name}</span> concluded with a
					Draw.
				</div>
			);
		else
			return (
				<div className="resultLog fjalla">
					<span className="winner">{event.winner?.team?.name}</span> won{" "}
					{formatEventName(event.event)}
					{!!(event as TennisEvent)?.matchType
						? "(" + (event as TennisEvent)?.matchType + ")"
						: null}{" "}
					{event.title} | {event.subtitle}, against{" "}
					<span className="loser">{getOppName(event)}</span>
				</div>
			);
	}
};
