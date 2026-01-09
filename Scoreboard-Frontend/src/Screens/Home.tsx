import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header/header";
import { detectMilestones, Milestone } from "../Utilities/MilestoneDetector";
import { LowerThirdData } from "../components/Broadcast/LowerThird";
import LiveEventsViewer from "../components/LiveEventsViewer";
import { socket } from "../Utilities/Socket";
import API from "../Utilities/ApiEndpoints";
import Event from "../types/Event";
import SplashScreen from "../components/SplashScreen";
import UpcomingEventsViewer from "../components/UpcomingEventsViewer";
import PointsTable from "../components/PointsTable";
import HeroMatchView from "../components/HeroMatchView";
import "./styles/Home.css";
import PastGamesResultsViewer from "../components/PastGamesResultsViewer";
import Footer from "../components/Footer/Footer";
import FullPageBroadcast from "../components/FullPageBroadcast";
import ScrollingTicker from "../components/ScrollingTicker";
import WinnerTreeOverlay from "../components/WinnerTreeOverlay";
import OverlayController from "../components/Broadcast/OverlayController";

const UPCOMING_EVENTS_LIMIT_BUFFER = 12 * 60 * 60 * 1000;

const Home = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState<string>("");
	const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
	const featuredTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [winnerAnnouncement, setWinnerAnnouncement] = useState<Event | null>(null);
	const [heroIndex, setHeroIndex] = useState(0);

	// Broadcast & Ticker State
	const [broadcastMessage, setBroadcastMessage] = useState<string>("");

	const [tickerText, setTickerText] = useState<string>("");
	const [lowerThird, setLowerThird] = useState<LowerThirdData | null>(null);
	const [fixedFeaturedId, setFixedFeaturedId] = useState<string>("");

	// Derive unique teams for Points Table (Optional/Hidden for now)
	const uniqueTeams = useMemo(() => {
		const teamsMap = new Map<string, any>();
		events.forEach(e => {
			if (e.teams) {
				e.teams.forEach(t => {
					if (t._id) teamsMap.set(t._id, t);
				});
			}
		});
		return Array.from(teamsMap.values());
	}, [events]);

	const liveEvents = useMemo(
		() =>
			events.filter((event) => {
				if (event.isStarted) return true;
				if (event.isCompleted && event.endTime) {
					const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
					return (event.endTime as number) > twoMinutesAgo;
				}
				return false;
			}),
		[events]
	);

	const upcomingEvents = useMemo(
		() =>
			events.filter(
				(event) =>
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
	}, [events]);

	// 1. Live Broadcast (Rotates automatically)
	const broadcastEvent = useMemo(() => {
		if (featuredEvent) return featuredEvent; // Winner Takeover
		if (liveEvents.length > 0) return liveEvents[heroIndex % liveEvents.length] || liveEvents[0];
		if (upcomingEvents.length > 0) return upcomingEvents[0];
		return null;
	}, [featuredEvent, liveEvents, upcomingEvents, heroIndex]);

	// 2. Header Scorebug (Fixed by Admin or falls back to Broadcast)
	const headerEvent = useMemo(() => {
		if (fixedFeaturedId) {
			const fixed = events.find(e => e._id === fixedFeaturedId);
			if (fixed) return fixed;
		}
		return broadcastEvent;
	}, [fixedFeaturedId, events, broadcastEvent]);

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

	const fetchGlobalConfig = async () => {
		try {
			const config = (await API.GetGlobalConfig()).data;
			if (config) {
				if (config.tickerText) setTickerText(config.tickerText);
				if (config.featuredEventId) setFixedFeaturedId(config.featuredEventId);
			}
		} catch (e) { console.log(e); }
	};

	const rotationSeconds = useMemo(() => {
		const params = new URLSearchParams(window.location.search);
		const val = params.get("rotate");
		const fallback = 10;
		if (!val) return fallback;
		const n = Number(val);
		return isNaN(n) ? fallback : Math.max(5, n);
	}, []);

	const updateScoreOfEvent = (score: {}, eventID: string) => {
		// Milestone Check
		const currentEvent = events.find(e => e._id === eventID);
		if (currentEvent) {
			const updatedEvent = { ...currentEvent, score };
			const milestone = detectMilestones(updatedEvent);
			if (milestone) {
				setLowerThird({
					title: milestone.message,
					subtitle: milestone.subMessage,
					duration: 5
				});
			}
		}

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
						// Trigger Winner Announcement Overlay
						setWinnerAnnouncement(endedEvent);

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

		const handleBroadcast = (data: { message: string, duration: number }) => {
			setBroadcastMessage(data.message);
			if (data.duration > 0) {
				setTimeout(() => {
					setBroadcastMessage("");
				}, data.duration * 1000);
			}
		};

		// Milestone Logic
		// We wrap updateEventsStatus/updateScoreOfEvent to check milestones
		// Actually, updateScoreOfEvent is passed to LiveEventsViewer.
		// We need to intercept it.

		const handleTicker = (data: { text: string }) => {
			setTickerText(data.text);
		};

		socket.on("connect", () => console.log("connected WS"));
		fetchEvents();
		fetchGlobalConfig();
		socket.on("eventStartOrEnd", updateEventsStatus);
		socket.on("broadcastAlert", handleBroadcast);
		socket.on("tickerUpdate", handleTicker);
		socket.on("eventsUpdated", () => {
			console.log("Events updated, refetching...");
			fetchEvents();
		});
		socket.on("featuredEventUpdate", (data: { eventId: string }) => {
			setFixedFeaturedId(data.eventId);
		});

		return () => {
			socket.off("connect");
			socket.off("eventStartOrEnd", updateEventsStatus);
			socket.off("broadcastAlert", handleBroadcast);
			socket.off("tickerUpdate", handleTicker);
			socket.off("eventsUpdated");
			socket.off("featuredEventUpdate");
			if (featuredTimeout.current) clearTimeout(featuredTimeout.current);
		};
	}, []);

	// Rotate hero match if multiple live events exist
	useEffect(() => {
		if (liveEvents.length <= 1) {
			setHeroIndex(0);
			return;
		}
		const interval = setInterval(() => {
			setHeroIndex((prev) => (prev + 1) % liveEvents.length);
		}, rotationSeconds * 1000);
		return () => clearInterval(interval);
	}, [liveEvents.length, rotationSeconds]);

	// REAL-TIME SCORE UPDATES FOR HERO MATCH
	// REAL-TIME SCORE UPDATES FOR HEADER AND BROADCAST
	useEffect(() => {
		const idsToSubscribe = new Set<string>();
		if (broadcastEvent?._id) idsToSubscribe.add(broadcastEvent._id);
		if (headerEvent?._id) idsToSubscribe.add(headerEvent._id);

		const ids = Array.from(idsToSubscribe);
		const cleanups: (() => void)[] = [];

		ids.forEach(eventId => {
			socket.emit("subscribe", eventId);
			const handler = (data: string) => {
				try {
					const score = JSON.parse(data);
					updateScoreOfEvent(score, eventId);
				} catch (e) { console.error("Error parsing score update", e); }
			};
			socket.on(`scoreUpdate/${eventId}`, handler);

			cleanups.push(() => {
				socket.emit("unsubscribe", eventId);
				socket.off(`scoreUpdate/${eventId}`, handler);
			});
		});

		return () => {
			cleanups.forEach(c => c());
		};
	}, [broadcastEvent?._id, headerEvent?._id]);

	return (
		<div className="sports-channel-layout">
			{broadcastMessage && (
				<FullPageBroadcast
					message={broadcastMessage}
					onDismiss={() => setBroadcastMessage("")}
				/>
			)}

			{/* Broadcast Overlays - Persistent Layer */}
			<OverlayController
				activeEvent={broadcastEvent}
				lowerThirdData={lowerThird}
				onLowerThirdComplete={() => setLowerThird(null)}
			/>

			<WinnerTreeOverlay
				event={winnerAnnouncement}
				onComplete={() => setWinnerAnnouncement(null)}
			/>

			{isLoading ? (
				<SplashScreen />
			) : (
				<>
					{loadError && (
						<div className="error-banner">{loadError}</div>
					)}
					<div className="navbar">
						<Header activeEvent={headerEvent} />
					</div>

					{/* 3-Column Layout: Upcoming (25%) | Live/Hero (50%) | Past (25%) */}
					<div className="main-content-3col">
						{/* LEFT: Upcoming */}
						<div className="col-side left">
							<div className="upcoming-section-full">
								<h3 className="section-header-small">UPCOMING MATCHES</h3>
								<div className="scroll-container">
									<UpcomingEventsViewer events={upcomingEvents} />
								</div>
							</div>
						</div>

						{/* CENTER: Consolidated Live Broadcast Area */}
						<div className="col-center">
							<div className="live-broadcast-area">
								{broadcastEvent ? (
									<div className="hero-section">
										<h3 className="section-header-small">LIVE BROADCAST</h3>
										<HeroMatchView event={broadcastEvent} />

										{/* Optional: Show others below if many live events exist? 
										    User said "1 live score section", so I'll keep it focused. 
										    If there are more live events, they will rotate in the Hero view 
										    due to Home.tsx rotation logic already present. */}
									</div>
								) : liveEvents.length > 0 ? (
									<div className="live-fallback-section">
										<h3 className="section-header-small">LIVE ACTION</h3>
										<LiveEventsViewer
											liveEvents={liveEvents}
											onScoreUpdate={updateScoreOfEvent}
											slideshow={true}
											intervalMs={rotationSeconds * 1000}
										/>
									</div>
								) : (
									<div className="broadcast-standby">
										<div className="standby-icon">📡</div>
										<div className="standby-title">STANDBY</div>
										<div className="standby-subtitle">Next match starting soon</div>
										<div className="standby-pulse"></div>
									</div>
								)}
							</div>
						</div>

						{/* RIGHT: Past Results */}
						<div className="col-side right">
							<div className="past-section-full">
								<h3 className="section-header-small">RECENT RESULTS</h3>
								<div className="scroll-container">
									<PastGamesResultsViewer
										events={pastEvents.length <= 15 ? pastEvents : pastEvents.slice(0, 15)}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="footer-spacer"></div>
					{tickerText && <ScrollingTicker text={tickerText} />}
				</>
			)}
		</div>
	);
};

export default Home;
