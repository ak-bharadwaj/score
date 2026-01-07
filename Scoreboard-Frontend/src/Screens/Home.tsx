import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header/header";
import LiveEventsViewer from "../components/LiveEventsViewer";
import { socket } from "../Utilities/Socket";
import API from "../Utilities/ApiEndpoints";
import Event from "../types/Event";
import SplashScreen from "../components/SplashScreen";
import UpcomingEventsViewer from "../components/UpcomingEventsViewer";
import "./styles/Home.css";
import PastGamesResultsViewer from "../components/PastGamesResultsViewer";
import Footer from "../components/Footer/Footer";

const UPCOMING_EVENTS_LIMIT_BUFFER = 12 * 60 * 60 * 1000;

const Home = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState<string>("");
	const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
	const featuredTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const liveEvents = useMemo(
		() => events.filter((event) => event.isStarted),
		[events]
	);

	const upcomingEvents = useMemo(
		() =>
			events.filter(
				(event) =>
					(event.endTime as number) > new Date().getTime() &&
					event.isStarted === false &&
					event.isCompleted === false
			),
		[events]
	);

	const pastEvents = useMemo(() => {
		let fEvents = events.filter((e) => e.isCompleted);
		fEvents.sort(
			(e1, e2) => (e1.startTime as number) - (e2.startTime as number)
		);
		fEvents.reverse();
		return fEvents;
		// recently ended events first
	}, [events]);

	const fetchEvents = async () => {
		try {
			const result: Event[] = (await API.GetEvents()).data;
			result.sort(
				(e1, e2) => (e1.startTime as number) - (e2.startTime as number)
			);
			setEvents(result);
			setIsLoading(false);
		} catch (err) {
			setLoadError("Failed to load events. Please refresh.");
			setIsLoading(false);
		}
	};

	// Optional slideshow toggle via URL: ?rotate=10 (seconds)
	const rotationSeconds = useMemo(() => {
		const params = new URLSearchParams(window.location.search);
		const val = params.get("rotate");
		const fallback = 10;
		if (!val) return fallback;
		const n = Number(val);
		return isNaN(n) ? fallback : Math.max(5, n);
	}, []);

	const updateScoreOfEvent = (score: {}, eventID: string) => {
		setEvents((prev) =>
			prev.map((event) => (eventID === event._id ? { ...event, score } : event))
		);
	};

	useEffect(() => {
		const updateEventsStatus = (data: string) => {
			const eventToBeUpdated = JSON.parse(data);
			setEvents((prev) => {
				const updated = prev.map((event) =>
					eventToBeUpdated.eventID === event._id
						? {
								...event,
								isStarted: eventToBeUpdated.isStarted,
								winner: eventToBeUpdated.winner,
								isCompleted: eventToBeUpdated.isCompleted,
						  }
						: event
				);

				if (!eventToBeUpdated.isStarted && eventToBeUpdated.isCompleted) {
					const endedEvent = updated.find(
						(evt) => evt._id === eventToBeUpdated.eventID
					);
					if (endedEvent) {
						if (featuredTimeout.current) clearTimeout(featuredTimeout.current);
						setFeaturedEvent(endedEvent);
						featuredTimeout.current = setTimeout(
							() => setFeaturedEvent(null),
							rotationSeconds * 1000
						);
					}
				}
				return updated;
			});
		};

		socket.on("connect", () => console.log("connected WS"));
		fetchEvents();
		socket.on("eventStartOrEnd", updateEventsStatus);

		return () => {
			socket.off("connect");
			socket.off("eventStartOrEnd", updateEventsStatus);
			if (featuredTimeout.current) clearTimeout(featuredTimeout.current);
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashScreen />
			) : (
				<>
					{loadError && (
						<div style={{
							position: "fixed",
							top: 0,
							left: 0,
							right: 0,
							background: "#fff3cd",
							color: "#664d03",
							borderBottom: "1px solid #ffe69c",
							padding: "8px 12px",
							zIndex: 2,
							textAlign: "center",
						}}>
							{loadError}
						</div>
					)}
					<div className="navbar">
						<Header />
					</div>
					<div className="content">
						<LiveEventsViewer
							onScoreUpdate={updateScoreOfEvent}
							liveEvents={liveEvents}
							slideshow={true}
							intervalMs={rotationSeconds * 1000}
							featuredEvent={featuredEvent}
						/>
						<div className="bottomContainer">
							<div className="leftContainer" id="schedule-section">
								<UpcomingEventsViewer
									heading={
										<h3
											style={{ marginTop: "0", marginBlockEnd: "0.5em" }}
											className="wire"
										>
											Upcoming Events
										</h3>
									}
									events={upcomingEvents.filter(
										(e) =>
											(e.startTime as number) <
											Date.now() + UPCOMING_EVENTS_LIMIT_BUFFER
									)}
								/>
							</div>
							<div id="results-section">
								<PastGamesResultsViewer
									events={
										pastEvents.length <= 50 ? pastEvents : pastEvents.slice(0, 49)
									}
								/>
							</div>
						</div>
					</div>
					<Footer />
				</>
			)}
		</>
	);
};

export default Home;
