import Event from "./Event";
import { Team } from "./Team";

export default interface CricketEvent extends Event {
	score: CricketScore;
	winner?: {
		team: Team;
	};
	eventLink?: string;
}

export interface CricketScore {
	teamA_runs: number;
	teamA_overs: number;
	teamA_wickets: number;
	teamB_runs: number;
	teamB_overs: number;
	teamB_wickets: number;
}
