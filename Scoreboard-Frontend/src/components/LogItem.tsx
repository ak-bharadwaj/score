import { useEffect, useState } from "react";
import Event from "../types/Event";
import { useAuthHeader } from "react-auth-kit";
import API from "../Utilities/ApiEndpoints";
import { formatEventName } from "../types/EventCategories";
import "./LogItem.css";

interface Log {
	eventID: string;
	userName: string;
	prevScore: any;
	currentScore: any;
}

interface LogItemProps {
	logs: Log[];
	eventID: string;
}

const LogItem: React.FC<LogItemProps> = ({ logs, eventID }) => {
	const [event, setEvent] = useState<Event>();
	const getAccessToken = useAuthHeader();
	const [dialogueOpen, setDialogueOpen] = useState(false);

	useEffect(() => {
		API.GetEventByID(getAccessToken(), eventID).then((data) => {
			console.log(data.data);
			setEvent(data.data);
		});
	}, []);

	if (!event) return <div>Loading...</div>;

	return (
		<>
			{dialogueOpen && (
				<div className="dialogue">
					<div className="dialogue-box">
						<div className="dialogue-box-head">
							<h2>
								{formatEventName(event.event)} {event.title} {event.subtitle}{" "}
								Result history
							</h2>
							<div
								className="dialogue-close"
								onClick={() => setDialogueOpen(false)}
							>
								&times;
							</div>
						</div>

						<div className="dialogue-body">
							{logs.map((log, i) => (
								<div key={i} className="log">
									<div className="log-text">
										Changed by <strong>{log.userName}</strong>
									</div>
									<div className="log-body">
										<div className="log-previous-score">
											<div>Previous Score</div>
											<code>{JSON.stringify(log.prevScore, null, 2)}</code>
										</div>
										<div className="log-current-score">
											<div>Current Score</div>
											<code>{JSON.stringify(log.currentScore, null, 2)}</code>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
			<div className="log-item" onClick={() => setDialogueOpen(true)}>
				Click to show{" "}
				<strong>
					{formatEventName(event.event)} {event.title} {event.subtitle}
				</strong>{" "}
				score update history
			</div>
		</>
	);
};

export default LogItem;
