import { StartingDate } from "../../App";
import FootballEvent, { FootballScore } from "../../types/FootballEvent";
import "./LiveEventBox.css";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const FootballEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: FootballScore) => void;
	event: FootballEvent;
}) => {
	return (
		<div className="liveEventBox">
			<span className="eventCategory">
				<SportsSoccerIcon />
				Football
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
				<div>
					<span className="fjalla">{event.score.teamA_points}</span>
					{isAdmin && (
						<>
							<button
								onClick={() => {
									onScoreUpdate!({
										...event.score,
										teamA_points: event.score.teamA_points + 1,
									});
								}}
								className="styledButton"
							>
								Add 1
							</button>
							<button
								style={{ marginTop: "5px" }}
								onClick={() => {
									onScoreUpdate!({
										...event.score,
										teamA_points: event.score.teamA_points - 1,
									});
								}}
								className="styledButton"
							>
								Minus 1
							</button>
						</>
					)}
				</div>
				<p className=" fjalla VS"></p>
				<div>
					<span className="fjalla">{event.score.teamB_points}</span>
					{isAdmin && (
						<>
							<button
								onClick={() => {
									onScoreUpdate!({
										...event.score,
										teamB_points: event.score.teamB_points + 1,
									});
								}}
								className="styledButton"
							>
								Add 1
							</button>
							<button
								style={{ marginTop: "5px" }}
								onClick={() => {
									onScoreUpdate!({
										...event.score,
										teamB_points: event.score.teamB_points - 1,
									});
								}}
								className="styledButton"
							>
								Minus 1
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default FootballEventBox;
