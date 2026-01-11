import { StartingDate } from "../App";
import AthleticsEvent from "../types/AthleticsEvent";
import Event from "../types/Event";
import EventCatagories, { formatEventName, getEventGender } from "../types/EventCategories";
import TeamLogo from "./TeamLogo";
import "./UpcomingEventsViewer.css";

const UpcomingEventsViewer = ({
	events,
}: {
	events: Event[];
}) => {
	if (events.length === 0) {
		return <div className="no-events-placeholder">No upcoming matches scheduled</div>;
	}

	return (
		<div className="upcoming-cards-grid">
			{events.map((event, i) => {
				const gender = getEventGender(event);
				return (
					<div
						key={i}
						className={`upcoming-card fjalla ${gender}`}
						style={{ animationDelay: `${i * 0.1}s` }}
					>
						{gender !== "unknown" && (
							<div className="upcoming-gender-badge">
								{gender === "men" ? "MEN" : "WOMEN"}
							</div>
						)}
						<div className="upcoming-card-header">
							<span className="upcoming-sport">{event.event}</span>
							<span className="upcoming-time-badge">
								{event.startTime ? new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "TBD"}
							</span>
						</div>

						<div className="upcoming-card-title">{event.title}</div>

						<div className="upcoming-teams-row">
							{event.teams && event.teams.length >= 2 ? (
								<>
									<div className="upcoming-team">
										<TeamLogo src={event.teams[0].logoUrl} name={event.teams[0].name} size={32} />
										<span className="upcoming-team-name">{event.teams[0].name}</span>
									</div>
									<div className="upcoming-vs">VS</div>
									<div className="upcoming-team">
										<TeamLogo src={event.teams[1].logoUrl} name={event.teams[1].name} size={32} />
										<span className="upcoming-team-name">{event.teams[1].name}</span>
									</div>
								</>
							) : (
								<div className="upcoming-subtitle">{event.subtitle}</div>
							)}
						</div>

						<div className="upcoming-card-footer">
							<span className="upcoming-date">
								DAY {event.startTime ? new Date(event.startTime).getDate() - StartingDate + 1 : "?"} • {event.startTime ? new Date(event.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' }) : "TBD"}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default UpcomingEventsViewer;
