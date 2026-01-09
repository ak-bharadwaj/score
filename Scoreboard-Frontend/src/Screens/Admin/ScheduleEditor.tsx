/* eslint-disable react-hooks/exhaustive-deps */
import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";
import {
	registerCellType,
	TimeCellType,
	DropdownCellType,
	DateCellType,
} from "handsontable/cellTypes";
import { registerPlugin, ExportFile, CopyPaste } from "handsontable/plugins";
import EventCatagories from "../../types/EventCategories";
import { Team } from "../../types/Team";
import { useRef, useContext, useState, useEffect, useMemo } from "react";
import "./ScheduleEditor.css";
import { ToastContext } from "../../Utilities/ToastContext";
import API from "../../Utilities/ApiEndpoints";
import Event from "../../types/Event";
import { useAuthHeader } from "react-auth-kit";
import { socket } from "../../Utilities/Socket";
import { MatchTypes } from "../../types/TennisEvent";
import AthleticsEventTypes from "../../types/AthleticsEventTypes";
import AthleticsRounds from "../../types/AthleticsRounds";
import AthleticsEvent from "../../types/AthleticsEvent";

registerCellType(TimeCellType);
registerCellType(DropdownCellType);
registerCellType(DateCellType);

registerPlugin(ExportFile);
registerPlugin(CopyPaste);

const getTime = (dateString: string, time: string) => {
	var dateParts = dateString.split("/");
	var dateObject = new Date(
		dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2]
	);
	function getSeconds(time: string): number {
		let timeParts = time.split(":");
		timeParts[3] = timeParts[2].split(" ")[1];
		timeParts[2] = timeParts[2].split(" ")[0];
		let seconds =
			(Number(timeParts[0]) * 60 + Number(timeParts[1])) * 60 +
			Number(timeParts[2]);
		if (
			(timeParts[3] === "pm" && Number(timeParts[0]) !== 12) ||
			(timeParts[3] === "PM" && Number(timeParts[0]) !== 12)
		)
			seconds += 12 * 60 * 60;
		return seconds;
	}
	dateObject.setTime(dateObject.getTime() + getSeconds(time) * 1000);
	return dateObject.getTime();
};

const makeParticipantsAndTeamsObj = (arr: any[]) => {
	let t: any[] = [];
	let p: any[] = [];
	for (let i = 0; i < arr.indexOf(null); i += 2) {
		const name = arr[i];
		const team = arr[i + 1];
		t.push(team);
		p.push({ name, team });
	}
	return { teams: t, participants: [p] };
};

const makeEventsArrayForDatabase = (data: any[]) => {
	const events = data.map((arr: any[]) => {
		const sport = arr[0];
		const gender = arr[1];
		const constructedEvent = gender ? `${sport}_${gender}` : sport;
		return {
			event: constructedEvent,
			matchType: arr[2],
			title: arr[3],
			subtitle: arr[4],
			startTime: getTime(arr[5], arr[6]),
			endTime: getTime(arr[5], arr[7]),
			teams: arr.slice(8, 10),
			eventLink: arr[10],
		};
	});
	return events;
};
const makeAthlEventsArrayForDatabase = (data: any[]) => {
	const events = data.map((arr: any[]) => {
		return {
			event: EventCatagories.ATHLETICS,
			athleticsEventType: arr[0],
			title: arr[1],
			startTime: getTime(arr[2], arr[3]),
			endTime: getTime(arr[2], arr[4]),
			...makeParticipantsAndTeamsObj(arr.slice(5)),
		};
	});
	return events;
};

const ScheduleEditor = ({ teams }: { teams: Team[] }) => {
	const hotRef = useRef<HotTable | null>(null);
	const athlTableRef = useRef<HotTable | null>(null);
	const setToast = useContext(ToastContext).setToastMessage;
	const getAccessToken = useAuthHeader();

	const [allEvents, setAllEvents] = useState<Event[]>([]);
	const [athlEvents, setAthlEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	const completedEventsIndexes = useMemo(() => {
		let indexes: any[] = [];
		allEvents.forEach((e, i) => {
			if (e.isCompleted || e.isStarted) indexes.push(i);
		});
		return indexes;
	}, [allEvents]);
	const completedAthlEventsIndexes = useMemo(() => {
		let indexes: any[] = [];
		athlEvents.forEach((e, i) => {
			if (e.isCompleted || e.isStarted) indexes.push(i);
		});
		return indexes;
	}, [athlEvents]);

	const mainCells = (row: number, col: number) => {
		const props: any = {};
		if (completedEventsIndexes.includes(row)) {
			props.readOnly = true;
		}

		if (allEvents[row]) {
			const gender = ((allEvents[row] as any).gender || '').toLowerCase();
			if (gender === 'women') {
				props.className = (props.className || '') + ` cell-women`;
				if (col === 0 || col === 1) props.className += ` first-cell-women`;
			} else if (gender === 'men') {
				props.className = (props.className || '') + ` cell-men`;
				if (col === 0 || col === 1) props.className += ` first-cell-men`;
			}
		}
		return props;
	};

	const athlCells = (row: number, col: number) => {
		const props: any = {};
		if (completedAthlEventsIndexes.includes(row)) {
			props.readOnly = true;
		}

		if (athlEvents[row]) {
			// Athletics often has type in athleticsEventType
			// We access the raw data object or the formatted one? 
			// athlEvents state contains formatted objects.
			const evt = ((athlEvents[row] as any).athleticsEventType || (athlEvents[row].title) || '').toString().toLowerCase();
			let gender = '';
			if (evt.includes('women') || evt.includes('girls') || evt.includes('female')) gender = 'women';
			else if (evt.includes('men') || evt.includes('boys') || evt.includes('male')) gender = 'men';

			if (gender) {
				props.className = (props.className || '') + ` cell-${gender}`;
				if (col === 0) props.className += ` first-cell-${gender}`;
			}
		}
		return props;
	};

	const formatForTable = (events: any[]) => {
		const fEvents = events.map((e) => {
			const eName = e.event || "";
			let sport = eName;
			let gender = "";
			const lower = eName.toLowerCase();
			if (lower.endsWith("_men")) {
				gender = "men";
				sport = eName.substring(0, eName.length - 4);
			} else if (lower.endsWith("_women")) {
				gender = "women";
				sport = eName.substring(0, eName.length - 6);
			}

			return {
				...e,
				sport,
				gender,
				date: new Date(e.startTime).toLocaleDateString("en-GB"),
				startTime: new Date(e.startTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: true,
				}),
				endTime: new Date(e.endTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: true,
				}),
			};
		});
		fEvents.forEach((e) => {
			e.teams.forEach((team: any, i: number) => {
				const key: string = "team" + i;
				e[key] = team.name;
			});
		});
		return fEvents as Event[];
	};

	const formatForAthlTable = (events: AthleticsEvent[]) => {
		const fEvents: any[] = events.map((e) => {
			return {
				...e,
				date: new Date(e.startTime).toLocaleDateString("en-GB"),
				startTime: new Date(e.startTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: true,
				}),
				endTime: new Date(e.endTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: true,
				}),
			};
		});
		fEvents.forEach((e) => {
			e.participants[0].forEach((participant: any, i: number) => {
				let key = "participant" + i;
				e[key] = participant.name;
				key = "team" + i;
				e[key] = participant.team;
			});
		});
		return fEvents as Event[];
	};

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		const otherEvents = result.filter(
			(e) => e.event !== EventCatagories.ATHLETICS
		);
		const athlEvents = result.filter(
			(e) => e.event === EventCatagories.ATHLETICS
		);
		setAllEvents(formatForTable(otherEvents));
		setAthlEvents(formatForAthlTable(athlEvents as AthleticsEvent[]));
		setLoading(false);
	};

	const saveTableData = async () => {
		const hot = hotRef?.current?.hotInstance;
		const athlTable = athlTableRef?.current?.hotInstance;
		const allRows = hot?.getData()!;
		const athlRows = athlTable?.getData()!;
		const notCompletedEventsRows = allRows.filter(
			(row: any[], i) => !completedEventsIndexes.includes(i)
		);
		const notCompletedAthlEventsRows = athlRows.filter(
			(row: any[], i) => !completedAthlEventsIndexes.includes(i)
		);
		const validRows = notCompletedEventsRows!.filter((arr) => arr[0] !== null);
		const validAthlRows = notCompletedAthlEventsRows!.filter(
			(arr) => arr[0] !== null
		);
		if (validRows?.length === 0 && validAthlRows?.length === 0) {
			//set schedule as empty
			try {
				await API.PostSchedule([], getAccessToken());
				setToast("Updated Schedule Successfully!");
				fetchEvents();
			} catch (error: any) {
				try {
					setToast(JSON.parse(error.request.response).message);
				} catch {
					setToast("Could not connect with the Server");
					console.log(error);
				}
			}
			return;
		}
		for (let i = 0; i < validRows!.length; i++) {
			const row: any[] = validRows![i];
			let last = row.length;
			last = row.indexOf(null, 3) !== -1 ? row.indexOf(null, 3) : last;
			last =
				row.indexOf("", 3) !== -1 && row.indexOf("", 3) < last
					? row.indexOf("", 3)
					: last;
			if (last <= 9) {
				setToast("Incomplete Details in a Row!");
				return;
			}
		}
		for (let i = 0; i < validAthlRows!.length; i++) {
			const row: any[] = validAthlRows![i];
			let last = row.length;
			last = row.indexOf(null, 1) !== -1 ? row.indexOf(null, 1) : last;
			last =
				row.indexOf("", 1) !== -1 && row.indexOf("", 1) < last
					? row.indexOf("", 1)
					: last;
			if (last <= 8 || (last - 5) % 2 !== 0) {
				setToast("Incomplete Details in a Row!");
				return;
			}
		}
		const data = [
			...makeEventsArrayForDatabase(validRows),
			...makeAthlEventsArrayForDatabase(validAthlRows),
		];
		//data to be sent to the server
		try {
			await API.PostSchedule(data, getAccessToken());
			setToast("Updated Schedule Successfully!");
			fetchEvents();
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
		const updateEventsStatus = (data: string) => {
			const eventToBeUpdated = JSON.parse(data);
			setAllEvents((prev) =>
				prev.map((event) =>
					eventToBeUpdated.eventID === event._id
						? { ...event, isStarted: eventToBeUpdated.isStarted }
						: event
				)
			);
		};
		socket.on("eventStartOrEnd", updateEventsStatus);
		fetchEvents();

		return () => {
			socket.off("eventStartOrEnd", updateEventsStatus);
		};
	}, []);

	return (
		<div className="usersContainer">
			<div className="top" style={{ fontWeight: "600" }}>
				Schedule Table
			</div>
			{loading ? (
				<>Loading All Events Data..</>
			) : (
				<>
					<div style={{ display: 'flex', gap: '10px', marginTop: '5px', alignItems: 'center' }}>
						<button
							className="styledButton"
							onClick={saveTableData}
						>
							Save
						</button>
						<button
							className="styledButton"
							style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
							onClick={async () => {
								if (window.confirm('⚠️ WARNING: This will PERMANENTLY delete ALL matches and events from the database. This action CANNOT be undone. Are you absolutely sure?')) {
									if (window.confirm('⚠️ FINAL WARNING: All live scores, results, and schedules will be deleted. Type OK in your mind and click to proceed.')) {
										try {
											// Call the backend to delete all events
											await API.DeleteAllEvents(getAccessToken());
											// Clear local state
											setAllEvents([]);
											setAthlEvents([]);
											alert('✅ All data has been permanently deleted from the database.');
											// Refresh the page to show empty state
											window.location.reload();
										} catch (error) {
											console.error('Error deleting all events:', error);
											alert('❌ Failed to delete all events. Please try again.');
										}
									}
								}
							}}
						>
							🗑️ Clear All Data
						</button>
					</div>

					<div
						className="tableContainer"
						style={{ overflowX: "auto", maxHeight: "80vh", width: "100%" }}
					>
						<HotTable
							copyPaste={true}
							ref={hotRef}
							data={allEvents}
							width="100%"
							height="500"
							stretchH="all"
							style={{ marginTop: "5px", boxSizing: "border-box" }}
							rowHeaders={true}
							cells={mainCells}
							columns={[
								{
									data: "sport",
									type: "dropdown",
									source: Array.from(new Set(Object.values(EventCatagories)
										.filter((s) => s !== EventCatagories.ATHLETICS)
										.map((s) => s.replace(/_men|_women/i, ''))
									)),
								},
								{
									data: "gender",
									type: "dropdown",
									source: ["men", "women"],
								},
								{
									data: "matchType",
									type: "dropdown",
									source: Object.values(MatchTypes),
								},
								{ data: "title", type: "text" },
								{ data: "subtitle", type: "text" },
								{ data: "date", type: "date", correctFormat: true },
								{
									data: "startTime",
									type: "time",
									timeFormat: "h:mm:ss a",
									correctFormat: true,
								},
								{
									data: "endTime",
									type: "time",
									timeFormat: "h:mm:ss a",
									correctFormat: true,
								},
								{
									data: "team0",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "team1",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{ data: "eventLink", type: "text" },
							]}
							colHeaders={[
								"Sport",
								"Gender",
								"MatchType?",
								"Name",
								"Subtitle",
								"Date",
								"Start Time",
								"Estimated End Time",
								"Team 1",
								"Team 2",
								"Score Link (for Cricket)",
							]}
							minSpareRows={2}
							colWidths={[150, 100, 100, 150, 150, 100, 100, 150, 150, 150, 250]}
							licenseKey="non-commercial-and-evaluation" // for non-commercial use only
						/>
					</div>
					<div
						className="tableContainer"
						style={{ overflowX: "auto", maxHeight: "80vh", width: "100%", marginTop: "30px" }}
					>
						<h3>Athletics Events Table</h3>
						<HotTable
							ref={athlTableRef}
							data={athlEvents}
							width="100%"
							height="400"
							stretchH="all"
							style={{ marginTop: "5px", boxSizing: "border-box" }}
							rowHeaders={true}
							cells={athlCells}
							columns={[
								{
									data: "athleticsEventType",
									type: "dropdown",
									source: Object.values(AthleticsEventTypes),
								},
								{
									data: "title",
									type: "dropdown",
									source: Object.values(AthleticsRounds),
								},
								{ data: "date", type: "date", correctFormat: true },
								{
									data: "startTime",
									type: "time",
									timeFormat: "h:mm:ss a",
									correctFormat: true,
								},
								{
									data: "endTime",
									type: "time",
									timeFormat: "h:mm:ss a",
									correctFormat: true,
								},
								{
									data: "participant0",
									type: "text",
								},
								{
									data: "team0",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant1",
									type: "text",
								},
								{
									data: "team1",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant2",
									type: "text",
								},
								{
									data: "team2",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant3",
									type: "text",
								},
								{
									data: "team3",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant4",
									type: "text",
								},
								{
									data: "team4",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant5",
									type: "text",
								},
								{
									data: "team5",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant6",
									type: "text",
								},
								{
									data: "team6",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant7",
									type: "text",
								},
								{
									data: "team7",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant8",
									type: "text",
								},
								{
									data: "team8",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "participant9",
									type: "text",
								},
								{
									data: "team9",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
							]}
							colHeaders={[
								"Event",
								"Round",
								"Date",
								"Start Time",
								"End Time",
								"Participant 1",
								"Team",
								"Participant 2",
								"Team",
								"Participant 3",
								"Team",
								"Participant 4",
								"Team",
								"Participant 5",
								"Team",
								"Participant 6",
								"Team",
								"Participant 7",
								"Team",
								"Participant 8",
								"Team",
								"Participant 9",
								"Team",
								"Participant 10",
								"Team",
							]}
							minSpareRows={2}
							colWidths={[
								150, 150, 100, 100, 100, 200, 130, 200, 130, 200, 130, 200, 130,
								200, 130, 200, 130, 200, 130, 200, 130, 200, 130, 200, 130,
							]}
							licenseKey="non-commercial-and-evaluation" // for non-commercial use only
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ScheduleEditor;
