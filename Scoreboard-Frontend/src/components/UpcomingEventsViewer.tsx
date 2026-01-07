import { StartingDate } from "../App";
import AthleticsEvent from "../types/AthleticsEvent";
import Event from "../types/Event";
import EventCatagories, { formatEventName } from "../types/EventCategories";
import "./UpcomingEventsViewer.css";

const UpcomingEventsViewer = ({
	events,
	heading,
}: {
	events: Event[];
	heading?: React.JSX.Element;
}) => {
	return (
		<div className={events.length !== 0 ? "allEvents" : "allEvents wire"}>
			{events.length !== 0 && heading}
			{events.length !== 0 ? (
				events.map((event, i) => (
					<div key={i} className="fjalla">
						<div className="vertical-line-blue"></div>
						<div className="event-event">{formatEventName(event.event)}</div>
						<div className="vertical-line-grey"></div>
						<span>
							{event.event === EventCatagories.ATHLETICS
								? (event as AthleticsEvent).athleticsEventType
								: event.title}
						</span>
						<span>
							{event.event === EventCatagories.ATHLETICS
								? (event as AthleticsEvent).title
								: event.subtitle}
						</span>
						<span style={{ color: "rgb(127, 132, 140)", flexGrow: "1" }}>
							Day {new Date(event.startTime).getDate() - StartingDate + 1} -{" "}
							{new Date(event.startTime).toLocaleString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							})}{" "}
						</span>
						{event.event === EventCatagories.ATHLETICS ? (
							<div className="tooltip">
								Participants
								<span className="tooltiptext">
									{(event as AthleticsEvent).participants[0].map((p, i) => (
										<div key={i}>
											{p.name} : {p.team}
										</div>
									))}
								</span>
							</div>
						) : (
							<ul>
								{event.teams.map((team, i) => (
									<li key={i}>{team.name} </li>
								))}
							</ul>
						)}
					</div>
				))
			) : (
				<>No Upcoming Events!</>
			)}
		</div>
	);
};

export default UpcomingEventsViewer;
