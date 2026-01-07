import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/header";
import Event from "../types/Event";
import "./styles/ScheduleViewer.css";
import API from "../Utilities/ApiEndpoints";
import UpcomingEventsViewer from "../components/UpcomingEventsViewer";

const ScheduleViewer = () => {
	const [allEvents, setAllEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		result.sort(
			(e1, e2) => (e1.startTime as number) - (e2.startTime as number)
		);
		setAllEvents(result);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchEvents();
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<div className="navbar">
				<Header />
			</div>
			<div
				className={isLoading ? "schedule-container wire" : "schedule-container"}
			>
				{isLoading ? (
					<>Loading Schedule Data</>
				) : (
					<UpcomingEventsViewer events={allEvents} />
				)}
			</div>
			<Footer />
		</>
	);
};

export default ScheduleViewer;
