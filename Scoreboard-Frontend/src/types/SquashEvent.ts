import Event from "./Event";
import { Team } from "./Team";

export default interface SquashEvent extends Event {
	winner?: {
		team: Team;
		participants: string[];
	};
	score: SquashScore;
}

export interface SquashScore {
	teamA_points: number;
	teamB_points: number;
}
