import Event from "./Event";
import { Team } from "./Team";

export default interface FootballEvent extends Event {
	teams: { name: string; points: number }[];
	winner?: {
		team: Team;
	};
	score: FootballScore;
}

export interface FootballScore {
	teamA_points: number;
	teamB_points: number;
}
