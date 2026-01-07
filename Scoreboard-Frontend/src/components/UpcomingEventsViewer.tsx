import { StartingDate } from "../App";
import AthleticsEvent from "../types/AthleticsEvent";
import Event from "../types/Event";
import EventCatagories, { formatEventName } from "../types/EventCategories";
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
			{events.map((event, i) => (
				<div key={i} className="upcoming-card fjalla">
					<div className="upcoming-card-header">
						<span className="upcoming-sport">{event.event}</span>
						<span className="upcoming-time-badge">
							{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>

					<div className="upcoming-card-title">{event.title}</div>

					<div className="upcoming-teams-row">
						{event.teams && event.teams.length >= 2 ? (
							<>
								<div className="upcoming-team">
									{event.teams[0].logoUrl && <img src={event.teams[0].logoUrl} alt="" className="upcoming-mini-logo" />}
									<span className="upcoming-team-name">{event.teams[0].name}</span>
								</div>
								<div className="upcoming-vs">VS</div>
								<div className="upcoming-team">
									{event.teams[1].logoUrl && <img src={event.teams[1].logoUrl} alt="" className="upcoming-mini-logo" />}
									<span className="upcoming-team-name">{event.teams[1].name}</span>
								</div>
							</>
						) : (
							<div className="upcoming-subtitle">{event.subtitle}</div>
						)}
					</div>

					<div className="upcoming-card-footer">
						<span className="upcoming-date">
							DAY {new Date(event.startTime).getDate() - StartingDate + 1} • {new Date(event.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default UpcomingEventsViewer;
