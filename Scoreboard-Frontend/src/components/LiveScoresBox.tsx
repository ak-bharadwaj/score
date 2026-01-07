import { useEffect } from "react";
import Event from "../types/Event";
import EventCatagories from "../types/EventCategories";
import FootballEvent from "../types/FootballEvent";
import FootballEventBox from "./LiveEventBoxes/FootballEventBox";
import { socket } from "../Utilities/Socket";
import ChessEventBox from "./LiveEventBoxes/ChessEventBox";
import ChessEvent from "../types/ChessEvent";
import SquashEventBox from "./LiveEventBoxes/SquashEventBox";
import SquashEvent from "../types/SquashEvent";
import TennisEventBox from "./LiveEventBoxes/TennisEventBox";
import TennisEvent from "../types/TennisEvent";
import CricketEventBox from "./LiveEventBoxes/CricketEventBox";
import CricketEvent from "../types/CricketEvent";

const LiveScoresBox = ({
	event,
	onScoreUpdate,
}: {
	event: Event;
	onScoreUpdate: (score: {}, eventID: string) => void;
}) => {
	useEffect(() => {
		socket.emit("subscribe", event._id);
		socket.on(`scoreUpdate/${event._id}`, (data: string) =>
			onScoreUpdate(JSON.parse(data), event._id!)
		);

		return () => {
			socket.emit("unsubscribe", event._id);
			socket.off(`scoreUpdate/${event._id}`, (data: string) =>
				onScoreUpdate(JSON.parse(data), event._id!)
			);
		};
	}, [event, onScoreUpdate]);

	const getEventBox = (event: Event): React.JSX.Element => {
		switch (event.event) {
			case EventCatagories.FOOTBALL:
				return <FootballEventBox event={event as FootballEvent} />;
			case EventCatagories.CHESS:
				return <ChessEventBox event={event as ChessEvent} />;
			case EventCatagories.SQUASH_MEN:
			case EventCatagories.SQUASH_WOMEN:
				return <SquashEventBox event={event as SquashEvent} />;
			case EventCatagories.TENNIS_MEN:
			case EventCatagories.TENNIS_WOMEN:
				return <TennisEventBox event={event as TennisEvent} />;
			case EventCatagories.CRICKET:
				return <CricketEventBox event={event as CricketEvent} />;
			default:
				// Render a generic team-points box for other team sports
				return <FootballEventBox event={event as FootballEvent} />;
		}
	};
	return getEventBox(event);
};

export default LiveScoresBox;
