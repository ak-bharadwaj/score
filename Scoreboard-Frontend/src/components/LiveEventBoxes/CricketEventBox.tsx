import { StartingDate } from "../../App";
import "./LiveEventBox.css";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import CricketEvent from "../../types/CricketEvent";

const CricketEventBox = ({ event }: { event: CricketEvent }) => {
	return (
		<div className="liveEventBox cricket">
			<span className="eventCategory">
				<SportsCricketIcon />
				Cricket
			</span>
			<h3 className="fjalla">{event.title}</h3>
			<h3 style={{ color: "red" }} className="fjalla">
				{event.subtitle} | Day{" "}
				{new Date(event.startTime).getDate() - StartingDate + 1} -{" "}
				{new Date(event.startTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					hour12: true,
				})}{" "}
			</h3>

			<hr className="hr" />
			<div className="footballScoresContainer">
				<div>
					<h3 className="fjalla">{event.teams[0].name}</h3>
				</div>
				<p className=" fjalla VS">VS</p>
				<div>
					<h3 className="fjalla">{event.teams[1].name}</h3>
				</div>
			</div>
			<hr className="hr" />
			<div className="footballScoresContainer">
				<a target="blank" href={event.eventLink}>
					Live Link
				</a>
			</div>
		</div>
	);
};

export default CricketEventBox;
