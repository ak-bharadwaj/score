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
		return {
			event: arr[0],
			matchType: arr[1],
			title: arr[2],
			subtitle: arr[3],
			startTime: getTime(arr[4], arr[5]),
			endTime: getTime(arr[4], arr[6]),
			teams: arr.slice(7, 9),
			eventLink: arr[9],
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

	useEffect(() => {
		const hot = hotRef?.current?.hotInstance;
		hot?.updateSettings({
			cells(row, col) {
				let cellProperties: any = {};
				if (completedEventsIndexes.includes(row)) {
					cellProperties.readOnly = true;
				}

				return cellProperties;
			},
		});
	}, [completedEventsIndexes]);

	const formatForTable = (events: any[]) => {
		const fEvents = events.map((e) => {
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
				API.PostSchedule([], getAccessToken());
				setToast("Updated Schedule Successfully!");
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
			last = row.indexOf(null, 2) !== -1 ? row.indexOf(null, 2) : last;
			last =
				row.indexOf("", 2) !== -1 && row.indexOf("", 2) < last
					? row.indexOf("", 2)
					: last;
			if (last <= 8) {
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
			API.PostSchedule(data, getAccessToken());
			setToast("Updated Schedule Successfully!");
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
					<button
						className="styledButton"
						style={{ marginTop: "5px" }}
						onClick={saveTableData}
					>
						Save
					</button>

					<div
						className="tableContainer"
						style={{ overflowX: "hidden", maxHeight: "80vh" }}
					>
						<HotTable
							copyPaste={true}
							ref={hotRef}
							data={allEvents}
							style={{ marginTop: "5px", boxSizing: "border-box" }}
							rowHeaders={true}
							columns={[
								{
									data: "event",
									type: "dropdown",
									source: Object.values(EventCatagories).filter(
										(s) => s !== EventCatagories.ATHLETICS
									),
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
								"Event",
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
							colWidths={[150, 100, 150, 150, 100, 100, 150, 150, 150, 250]}
							licenseKey="non-commercial-and-evaluation" // for non-commercial use only
						/>
					</div>
					<div
						className="tableContainer"
						style={{ overflowX: "hidden", maxHeight: "80vh" }}
					>
						<h3>Athletics Events Table</h3>
						<HotTable
							ref={athlTableRef}
							data={athlEvents}
							style={{ marginTop: "5px", boxSizing: "border-box" }}
							rowHeaders={true}
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
