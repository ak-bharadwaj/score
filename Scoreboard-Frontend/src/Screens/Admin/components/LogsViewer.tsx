import { useEffect, useState } from "react";
import API from "../../../Utilities/ApiEndpoints";
import { useAuthHeader } from "react-auth-kit";
import LogItem from "../../../components/LogItem";

const LogsViewer = () => {
	const [logs, setLogs] = useState<any>([]);
	const getAccessToken = useAuthHeader();

	useEffect(() => {
		// setLogs(await API.GetLogs(getAccessToken()));
		API.GetLogs(getAccessToken()).then((res) => {
			let eventGroupedLogs: any = {};

			res.data.forEach((log: any) => {
				if (eventGroupedLogs[log.eventID] === undefined) {
					eventGroupedLogs[log.eventID] = [];
				}

				eventGroupedLogs[log.eventID].push(log);
			});

			console.log(Object.values(eventGroupedLogs));
			setLogs(eventGroupedLogs);
		});
	}, []);

	return (
		<div className="usersContainer">
			<section className="top">Score Edit Logs</section>
			<section className="main">
				{Object.keys(logs).map((eventID) => (
					<LogItem key={eventID} logs={logs[eventID]} eventID={eventID} />
				))}
			</section>
		</div>
	);
};

export default LogsViewer;
