import AthleticsEvent from "../types/AthleticsEvent";
import { formatEventName } from "../types/EventCategories";
import { useState } from "react";
import "./table.css";

interface AthleticsGamesResultLogProps {
	event: AthleticsEvent;
}

const formatTime = (time: number) => {
	return `${Math.floor(time / (60 * 1000))}m ${Math.floor(time % (60 * 1000)) / 1000
		}s`;
};

const AthleticsGamesResultLog: React.FC<AthleticsGamesResultLogProps> = ({
	event,
}) => {
	const [dialogueOpen, setDialogueOpen] = useState<boolean>(false);
	return (
		<>
			{dialogueOpen && (
				<div className="dialogue">
					<div className="dialogue-box">
						<div className="dialogue-box-head">
							<h2>
								{formatEventName(event.athleticsEventType)} {event.title}{" "}
								Results
							</h2>
							<div
								className="dialogue-close"
								onClick={() => setDialogueOpen(false)}
							>
								&times;
							</div>
						</div>

						<div className="dialogue-body">
							<table className="excel-like-table" id="result-table">
								<thead>
									<tr>
										<th>Rank</th>
										<th>Participant</th>
										<th>Team</th>
										<th>
											{!!event.winner?.participants &&
												!!event.winner?.participants[0].distance
												? "Distance"
												: "Time"}
										</th>
									</tr>
								</thead>

								{!!event.winner?.participants && (
									<tbody>
										{event.winner.participants.map((p, i) => {
											console.log(p);
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>{p.name}</td>
													<td>{p.team}</td>
													<td>
														{p.distance ? p.distance + "m" : formatTime(p.time)}
													</td>
												</tr>
											);
										})}
									</tbody>
								)}
							</table>
						</div>
					</div>
				</div>
			)}
			<div className="result-card fjalla">
				<div className="result-card-header">
					<span className="event-type">{formatEventName(event.athleticsEventType)}</span>
					<span className="event-title">{event.title}</span>
				</div>
				<div className="result-card-body" style={{ justifyContent: 'center', padding: '10px 0' }}>
					<span style={{ fontSize: '1.2rem', color: '#00ff00', fontWeight: 'bold' }}>EVENT CONCLUDED</span>
				</div>
				<div className="result-card-footer">
					<div className="view-details-link" onClick={() => setDialogueOpen(true)}>
						VIEW FINAL STANDINGS
					</div>
				</div>
			</div>
		</>
	);
};

export default AthleticsGamesResultLog;
