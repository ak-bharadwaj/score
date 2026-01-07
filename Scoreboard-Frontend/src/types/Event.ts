import EventCatagories from "./EventCategories";
import { Team } from "./Team";

export default interface Event {
	_id?: string; // also roomId for socket room
	title: string;
	subtitle?: string;
	event: EventCatagories;
	isStarted: boolean;
	isCompleted: boolean;
	startTime: number | string;
	endTime: number | string;
	teams: Team[]; // list of teams who are compeating
	score: {};
	winner?: { team: Team; participants?: any[] };
}

export interface EventExceptAthleticsOrCricket extends Event {
	score: {
		teamA_points: number;
		teamB_points: number;
	};
}
