import Event from "./Event";
import { Team } from "./Team";

export default interface TennisEvent extends Event {
	matchType: MatchTypes;
	winner?: {
		team: Team;
		participants: string[];
	};
	score: TennisScore;
}

export interface TennisScore {
	teamA_points: number;
	teamB_points: number;
}

export enum MatchTypes {
	DOUBLES = "Doubles",
	SINGLES = "Singles",
}
