import Event from "./Event";
import { Team } from "./Team";

export default interface ChessEvent extends Event {
	winner?: {
		team: Team;
		participant: string[];
	};
	score: ChessScore;
}

export interface ChessScore {
	teamA_points: number;
	teamB_points: number;
}
