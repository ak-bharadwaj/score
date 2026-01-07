import CricketEvent from "../types/CricketEvent";

const CricketGameResultLog = ({ event }: { event: CricketEvent }) => {
	return (
		<div
			className="resultLog fjalla"
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<span>
				{event.event} {event.title} | {event.subtitle}, between{" "}
				<span className="winner">{event.teams[0].name}</span> and{" "}
				<span className="winner">{event.teams[1].name}</span> concluded.
			</span>
			<a target="blank" href={event.eventLink}>
				View Results
			</a>
		</div>
	);
};

export default CricketGameResultLog;
