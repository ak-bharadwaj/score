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
					{event.teams[0].logoUrl && <img src={event.teams[0].logoUrl} alt="" className="team-logo-mini" />}
					<h3 className="fjalla">{event.teams[0].name}</h3>
				</div>
				<p className=" fjalla VS">VS</p>
				<div>
					{event.teams[1].logoUrl && <img src={event.teams[1].logoUrl} alt="" className="team-logo-mini" />}
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
