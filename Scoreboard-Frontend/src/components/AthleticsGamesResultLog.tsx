import AthleticsEvent from "../types/AthleticsEvent";
import { formatEventName } from "../types/EventCategories";
import { useState } from "react";
import "./table.css";

interface AthleticsGamesResultLogProps {
	event: AthleticsEvent;
}

const formatTime = (time: number) => {
	return `${Math.floor(time / (60 * 1000))}m ${
		Math.floor(time % (60 * 1000)) / 1000
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
			<div className="resultLog fjalla athletic-result-log">
				<span>
					{formatEventName(event.athleticsEventType)} {event.title} concluded.
				</span>
				<div className="tooltip" onClick={() => setDialogueOpen(true)}>
					View Results
				</div>
				{/* TODO: Add view results */}
			</div>
		</>
	);
};

export default AthleticsGamesResultLog;
