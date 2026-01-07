import { StartingDate } from "../../App";
import ChessEvent, { ChessScore } from "../../types/ChessEvent";
import "./LiveEventBox.css";
import GridOnIcon from "@mui/icons-material/GridOn";

const ChessEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: ChessScore) => void;
	event: ChessEvent;
}) => {
	return (
		<div className="liveEventBox chess">
			<span className="eventCategory">
				<GridOnIcon />
				Chess
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
										teamA_points: event.score.teamA_points + 0.5,
									});
								}}
								className="styledButton"
							>
								Add 0.5
							</button>
							<button
								style={{ marginTop: "5px" }}
								onClick={() => {
									onScoreUpdate!({
										...event.score,
										teamA_points: event.score.teamA_points - 0.5,
									});
								}}
								className="styledButton"
							>
								Minus 0.5
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
										teamB_points: event.score.teamB_points + 0.5,
									});
								}}
								className="styledButton"
							>
								Add 0.5
							</button>
							<button
								style={{ marginTop: "5px" }}
								onClick={() => {
									onScoreUpdate!({
										...event.score,
										teamB_points: event.score.teamB_points - 0.5,
									});
								}}
								className="styledButton"
							>
								Minus 0.5
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChessEventBox;
