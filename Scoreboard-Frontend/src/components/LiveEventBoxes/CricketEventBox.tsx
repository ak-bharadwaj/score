import { StartingDate } from "../../App";
import "./LiveEventBox.css";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import CricketEvent from "../../types/CricketEvent";
import TeamLogo from "../TeamLogo";
import { getEventGender } from "../../types/EventCategories";

const CricketEventBox = ({ event }: { event: CricketEvent }) => {
	const gender = getEventGender(event);

	return (
		<div className={`liveEventBox cricket ${gender}`}>
			<span className="eventCategory">
				<SportsCricketIcon />
				Cricket
			</span>
			{gender !== "unknown" && (
				<div className="gender-tag-container">
					<span className="gender-tag">{gender === "men" ? "MEN" : "WOMEN"}</span>
				</div>
			)}
			<h3 className="fjalla">{event.title}</h3>
			<h3 style={{ color: "red" }} className="fjalla">
				{event.subtitle} | Day{" "}
				{event.startTime ? new Date(event.startTime).getDate() - StartingDate + 1 : "?"} -{" "}
				{event.startTime ? new Date(event.startTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					hour12: true,
				}) : "TBD"}{" "}
			</h3>

			<hr className="hr" />
			<div className="footballScoresContainer">
				<div>
					<TeamLogo src={event.teams[0].logoUrl} name={event.teams[0].name} size={30} />
					<h3 className="fjalla">{event.teams[0].name}</h3>
				</div>
				<p className=" fjalla VS">VS</p>
				<div>
					<TeamLogo src={event.teams[1].logoUrl} name={event.teams[1].name} size={30} />
					<h3 className="fjalla">{event.teams[1].name}</h3>
				</div>
			</div>
			<hr className="hr" />
			<div className="footballScoresContainer">
				<div style={{ textAlign: "center" }}>
					<h2 className="fjalla score" style={{ margin: "5px" }}>
						{event.score.teamA_runs}/{event.score.teamA_wickets}
					</h2>
					<h4 className="fjalla" style={{ margin: "0" }}>
						({event.score.teamA_overs})
					</h4>
				</div>
				<p className=" fjalla VS">VS</p>
				<div style={{ textAlign: "center" }}>
					<h2 className="fjalla score" style={{ margin: "5px" }}>
						{event.score.teamB_runs}/{event.score.teamB_wickets}
					</h2>
					<h4 className="fjalla" style={{ margin: "0" }}>
						({event.score.teamB_overs})
					</h4>
				</div>
			</div>
		</div>
	);
};

export default CricketEventBox;
