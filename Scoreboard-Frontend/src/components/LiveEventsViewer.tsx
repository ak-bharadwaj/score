import Event from "../types/Event";
import LiveScoresBox from "./LiveScoresBox";
import { useEffect, useMemo, useState } from "react";

const LiveEventsViewer = ({
	liveEvents,
	onScoreUpdate,
	slideshow,
	intervalMs,
}: {
	liveEvents: Event[];
	onScoreUpdate: (score: {}, eventID: string) => void;
	slideshow?: boolean;
	intervalMs?: number;
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const sanitizedInterval = useMemo(() => {
		if (!intervalMs || intervalMs < 1000) return 10000; // default 10s
		return intervalMs;
	}, [intervalMs]);

	useEffect(() => {
		if (!slideshow || liveEvents.length <= 1) return;
		setCurrentIndex(0);
		const id = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % liveEvents.length);
		}, sanitizedInterval);
		return () => clearInterval(id);
	}, [slideshow, liveEvents.length, sanitizedInterval]);

	const itemsToRender = useMemo(() => {
		if (slideshow && liveEvents.length > 0) return [liveEvents[currentIndex]];
		return liveEvents;
	}, [slideshow, liveEvents, currentIndex]);

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
