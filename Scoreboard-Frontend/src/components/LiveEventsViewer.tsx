import Event from "../types/Event";
import LiveScoresBox from "./LiveScoresBox";
import { useEffect, useMemo, useState } from "react";

const LiveEventsViewer = ({
	liveEvents,
	onScoreUpdate,
	slideshow = true,
	intervalMs,
	featuredEvent,
}: {
	liveEvents: Event[];
	onScoreUpdate: (score: {}, eventID: string) => void;
	slideshow?: boolean;
	intervalMs?: number;
	featuredEvent?: Event | null;
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const sanitizedInterval = useMemo(() => {
		if (!intervalMs || intervalMs < 1000) return 10000; // default 10s
		return intervalMs;
	}, [intervalMs]);

	useEffect(() => {
		if (liveEvents.length === 0) return;
		setCurrentIndex((prev) =>
			Math.min(prev, Math.max(liveEvents.length - 1, 0))
		);
	}, [liveEvents.length]);

	useEffect(() => {
		if (!slideshow || featuredEvent || liveEvents.length <= 1) return;
		setCurrentIndex(0);
		const id = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % liveEvents.length);
		}, sanitizedInterval);
		return () => clearInterval(id);
	}, [slideshow, liveEvents.length, sanitizedInterval, featuredEvent]);

	const itemsToRender = useMemo(() => {
		if (featuredEvent) return [featuredEvent];
		if (slideshow && liveEvents.length > 0)
			return [liveEvents[Math.min(currentIndex, liveEvents.length - 1)]];
		return liveEvents;
	}, [slideshow, liveEvents, currentIndex, featuredEvent]);

	return (
		<>
			{itemsToRender.length !== 0 && (
				<h3
					style={{
						marginTop: "0em",
						marginBlockEnd: "0em",
						justifyContent: "center",
						paddingTop: window.innerWidth > 900 ? "10px" : "0px",
						paddingBottom: "10px",
						fontSize: "1.8em",
						fontWeight: 900,
					}}
					className="wire"
				>
					Live Scores
				</h3>
			)}
			<div
				className={
					itemsToRender.length !== 0 ? "home liveEvents" : "home liveEvents wire"
				}
			>
				{itemsToRender.length !== 0 ? (
					itemsToRender.map((event, i) => (
						<LiveScoresBox
							onScoreUpdate={onScoreUpdate}
							event={event}
							key={i}
						/>
					))
				) : (
					<>No Live Events Right Now!</>
				)}
			</div>
		</>
	);
};

export default LiveEventsViewer;
