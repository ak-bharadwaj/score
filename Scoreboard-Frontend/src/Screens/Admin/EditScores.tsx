/* eslint-disable react-hooks/exhaustive-deps */
import "./EditScores.css";
import { useEffect, useMemo, useState, useContext, useRef } from "react";
import Event, { EventExceptAthleticsOrCricket } from "../../types/Event";
import EventCatagories from "../../types/EventCategories";
import FootballEvent from "../../types/FootballEvent";
import FootballEventBox from "../../components/LiveEventBoxes/FootballEventBox";
import API from "../../Utilities/ApiEndpoints";
import { useAuthHeader } from "react-auth-kit";
import { ToastContext } from "../../Utilities/ToastContext";
import ChessEventBox from "../../components/LiveEventBoxes/ChessEventBox";
import ChessEvent from "../../types/ChessEvent";
import SquashEventBox from "../../components/LiveEventBoxes/SquashEventBox";
import SquashEvent from "../../types/SquashEvent";
import TennisEventBox from "../../components/LiveEventBoxes/TennisEventBox";
import TennisEvent from "../../types/TennisEvent";
import AthleticsEvent, { Participant } from "../../types/AthleticsEvent";
import { AthleticsEventWithDistance } from "../../types/AthleticsEventTypes";
import { Team } from "../../types/Team";
import EditableCricketEventBox from "../../components/LiveEventBoxes/EditableCricketEventBox";
import CricketEvent from "../../types/CricketEvent";

const EVENT_START_BUFFER = 15 * 60 * 1000; //the duration BEFORE the startTime from when an event can be started in milliseconds

const EditScores = () => {
	const getAccessToken = useAuthHeader();
	const setToast = useContext(ToastContext).setToastMessage;

	const [loading, setLoading] = useState(true);

	const [allEvents, setAllEvents] = useState<Event[]>([]);
	const liveEvents = useMemo(
		() => allEvents.filter((event) => event.isStarted),
		[allEvents]
	);
	const liveAbleEvents = useMemo(
		() =>
			allEvents.filter(
				(e) =>
					!e.isCompleted &&
					(e.startTime as number) <= new Date().getTime() + EVENT_START_BUFFER
			),
		[allEvents]
	);
	const [eventToToggle, setEventToToggle] = useState<Event>();
	const confirmToggleDialog = useRef<HTMLDialogElement | null>(null);
	const athlEventWinnerDialog = useRef<HTMLDialogElement | null>(null);
	const [manualWinner, setManualWinner] = useState<string>("DRAW");

	const openDialog = () => {
		confirmToggleDialog.current?.showModal();
	};
	const closeDialog = () => {
		confirmToggleDialog.current?.close();
		athlEventWinnerDialog.current?.close();
	};

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		setAllEvents(result);
		setLoading(false);
	};

	const handleScoreUpdate = async (id: string, score: any) => {
		try {
			await API.UpdateScore(getAccessToken(), id, score);
			const newEvents = allEvents.map((e) => {
				if (e._id === id) return { ...e, score: score };
				else return e;
			});
			setAllEvents(newEvents);
		} catch (error: any) {
			try {
				setToast(JSON.parse(error.request.response).message);
			} catch {
				setToast("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	const getEventBox = (event: Event, i: number): React.JSX.Element => {
		switch (event.event) {
			case EventCatagories.FOOTBALL:
				return (
					<FootballEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as FootballEvent}
					/>
				);
			case EventCatagories.CHESS:
				return (
					<ChessEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as ChessEvent}
					/>
				);
			case EventCatagories.SQUASH_MEN:
			case EventCatagories.SQUASH_WOMEN:
				return (
					<SquashEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as SquashEvent}
					/>
				);
			case EventCatagories.TENNIS_MEN:
			case EventCatagories.TENNIS_WOMEN:
				return (
					<TennisEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as TennisEvent}
					/>
				);
			case EventCatagories.CRICKET:
				return (
					<EditableCricketEventBox
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as CricketEvent}
					/>
				);
			default:
				// Fallback to a generic team-points editor for other team sports
				return (
					<FootballEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as FootballEvent}
					/>
				);
		}
	};

	return (
		<div className="admin-dashboard-container">
			<h1 className="admin-header">Live Event Management</h1>

			<div className="global-controls-section">
				<h3>Global Controls</h3>
				<div className="control-group">
					<label htmlFor="tickerInput">Ticker Text (Scrolling at bottom):</label>
					<div className="control-input-row">
						<input
							className="styledInput"
							style={{ flex: 1 }}
							placeholder="Enter scrolling ticker text..."
							id="tickerInput"
						/>
						<button
							className="styledButton"
							onClick={async () => {
								const input = document.getElementById("tickerInput") as HTMLInputElement;
								try {
									await API.UpdateTicker(getAccessToken(), input.value);
									setToast("Ticker Updated");
								} catch (e) {
									setToast("Failed to update ticker");
								}
							}}
						>
							Update Ticker
						</button>
					</div>
				</div>

				<div className="control-group">
					<label htmlFor="broadcastMsg">Broadcast Alert (Fullscreen Overlay):</label>
					<div className="control-input-row">
						<input
							className="styledInput"
							style={{ flex: 2 }}
							placeholder="Enter alert message (e.g. GOAL!)"
							id="broadcastMsg"
						/>
						<input
							className="styledInput"
							type="number"
							style={{ width: "100px" }}
							placeholder="Seconds"
							defaultValue={5}
							id="broadcastDuration"
						/>
						<button
							className="styledButton"
							style={{ backgroundColor: "#ff3b30" }}
							onClick={async () => {
								const msgInput = document.getElementById("broadcastMsg") as HTMLInputElement;
								const durInput = document.getElementById("broadcastDuration") as HTMLInputElement;
								try {
									await API.BroadcastMessage(getAccessToken(), msgInput.value, Number(durInput.value));
									setToast("Broadcast Sent");
								} catch (e) {
									setToast("Failed to send broadcast");
								}
							}}
						>
							SEND ALERT
						</button>
					</div>
				</div>
			</div>

			<div className="live-events-section">
				<h2 className="admin-header" style={{ fontSize: '1.5rem' }}>Active Events (Live Now)</h2>
				{!loading ? (
					liveEvents && liveEvents.length > 0 ? (
						<div className="live-events-grid">
							{liveEvents.map((event, i) => getEventBox(event, i))}
						</div>
					) : (
						<p className="empty-state">No events currently live.</p>
					)
				) : (
					<p>Loading Events Data...</p>
				)}
			</div>

			<div className="live-able-section">
				<h2 className="admin-header" style={{ fontSize: '1.5rem' }}>Scheduled Events (Ready to Go Live)</h2>
				<div className="live-able-list">
					{liveAbleEvents.length !== 0 ? (
						liveAbleEvents.map((event, i) => (
							<div key={i} className="live-able-item">
								<div className="event-info">
									<h4>
										{event.event} - {event.title}
										{event.isStarted && <span className="chip">LIVE</span>}
									</h4>
									<p>
										{(event as AthleticsEvent).athleticsEventType ? (event as AthleticsEvent).athleticsEventType + " | " : ""}
										{new Date(event.startTime).toLocaleString("en-US", {
											weekday: 'short',
											month: 'short',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric',
										})}
									</p>
									<ul style={{ margin: '10px 0 0 20px', fontSize: '0.85rem', color: '#666' }}>
										{event.event === EventCatagories.ATHLETICS
											? (event as AthleticsEvent).participants[0].map((p, idx) => (
												<li key={idx}>
													{p.name} ({p.team})
												</li>
											))
											: event.teams.map((team, idx) => (
												<li key={idx}>{team.name}</li>
											))}
									</ul>
								</div>

								<button
									className="styledButton"
									style={{ backgroundColor: event.isStarted ? '#e74c3c' : '#2ecc71' }}
									onClick={async () => {
										if (event!.isStarted) {
											if ((event!.startTime as number) > new Date().getTime()) {
												setToast("Can't end this event right now!");
												return;
											}
											setEventToToggle(event);
											setManualWinner("DRAW");
											openDialog();
										} else {
											try {
												await API.ToggleEventStatus(
													getAccessToken(),
													event!._id!
												);
												setToast("Event is now Live!");
												setLoading(true);
												fetchEvents();
											} catch (error: any) {
												try {
													setToast(JSON.parse(error.request.response).message);
												} catch {
													setToast("Could not connect with the Server");
												}
											}
										}
									}}
								>
									{event.isStarted ? "End Event" : "Go Live"}
								</button>
							</div>
						))
					) : (
						<p className="empty-state">No events scheduled for the near future.</p>
					)}
				</div>
			</div>

			{/* Dialogs remain the same in functionality */}
			<dialog ref={confirmToggleDialog} style={{ padding: '20px', borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
				<h3>Confirm Event End</h3>
				<p>Are you sure you want to end this event?</p>
				<p><strong>{eventToToggle?.title}</strong></p>

				{eventToToggle?.event !== EventCatagories.ATHLETICS &&
					eventToToggle?.event !== EventCatagories.CRICKET &&
					(eventToToggle as EventExceptAthleticsOrCricket)?.score.teamA_points ===
					(eventToToggle as EventExceptAthleticsOrCricket)?.score.teamB_points && (
						<div style={{ marginBottom: '20px' }}>
							<label>Select Winner (Manual): </label>
							<select
								onChange={(e) => setManualWinner(e.target.value)}
								value={manualWinner}
								className="styledInput"
								style={{ width: '100%', marginTop: '10px' }}
							>
								<option value="DRAW">DRAW</option>
								{eventToToggle?.teams.map(t => (
									<option key={t._id} value={t.name}>{t.name}</option>
								))}
							</select>
						</div>
					)}

				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
					<button className="styledButton" style={{ backgroundColor: '#bbb' }} onClick={closeDialog}>Cancel</button>
					<button
						className="styledButton"
						style={{ backgroundColor: '#e74c3c' }}
						onClick={async () => {
							if (eventToToggle?.event === EventCatagories.ATHLETICS) {
								confirmToggleDialog.current?.close();
								athlEventWinnerDialog.current!.showModal();
								return;
							}
							try {
								if (manualWinner !== "DRAW") {
									const winner = {
										team: eventToToggle!.teams.find(
											(t) => t.name === manualWinner
										) as Team,
									};
									await API.SetWinnerManually(
										getAccessToken(),
										eventToToggle!._id!,
										winner
									);
								}
								await API.ToggleEventStatus(
									getAccessToken(),
									eventToToggle!._id!
								);
								setToast("Event Ended Successfully");
								setLoading(true);
								fetchEvents();
							} catch (error: any) {
								setToast("Failed to toggle event status");
							}
							confirmToggleDialog.current?.close();
							setEventToToggle(undefined);
						}}
					>
						Confirm End
					</button>
				</div>
			</dialog>
		</div>
	);
};

export default EditScores;

const AthlEventParticipantDetailsForm = ({
	event,
	onSuccess,
}: {
	event: AthleticsEvent;
	onSuccess: () => void;
}) => {
	const getAccessToken = useAuthHeader();
	const setToast = useContext(ToastContext).setToastMessage;
	const [participants, setParticipants] = useState(event.participants[0]);

	const getMillis = (time: string) => {
		const timeParts = time.split(":");
		let millis = Number(timeParts[0]) * 60 * 1000;
		if (timeParts.length >= 2) millis += Number(timeParts[1]) * 1000;
		if (timeParts.length >= 3) millis += Number(timeParts[2]);
		return millis;
	};

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				let newParticipants: Participant[] = [];
				participants.forEach((p) => {
					if (p.detail === undefined) {
						setToast("Incomplete Details");
						return;
					}
					newParticipants.push(
						(Object.values(AthleticsEventWithDistance) as any[]).includes(
							(event as AthleticsEvent).athleticsEventType
						)
							? { name: p.name, team: p.team, distance: Number(p.detail) }
							: { name: p.name, team: p.team, time: getMillis(p.detail) }
					);
				});
				try {
					await API.SetAthleticsEventDetails(
						getAccessToken(),
						event._id!,
						newParticipants
					);
					await API.ToggleEventStatus(getAccessToken(), event!._id!);
					setToast("Successfull");
					onSuccess();
				} catch (error: any) {
					try {
						setToast(JSON.parse(error.request.response).message);
					} catch {
						setToast("Could not connect with the Server");
						console.log(error);
					}
				}
			}}
		>
			{participants.map((p, i) => (
				<div>
					<label>{p.name}</label>
					<input
						name="details"
						type="text"
						onChange={(e) =>
							setParticipants(
								participants.map((op) =>
									op.name === p.name ? { ...op, detail: e.target.value } : op
								)
							)
						}
						value={participants[i].detail}
						className="styledInput"
					/>
				</div>
			))}
			<button className="styledButton" type="submit">
				Submit
			</button>
		</form>
	);
};
