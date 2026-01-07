import Event from "./Event";
import { Team } from "./Team";

export default interface CricketEvent extends Event {
	winner?: {
		team: Team;
	};
	eventLink?: string;
}
