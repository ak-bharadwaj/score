import EventCatagories from "./EventCategories";
import Participant from "./Participant";

export default interface Event<T extends Score> {
  _id?: string;
  subtitle?: string;
  title: string;
  event: EventCatagories;
  isStarted?: boolean;
  startTime?: number;
  endTime?: number;
  score?: T;
  isCompleted?: boolean;
  teams: string[]; // list of teamIDs who are compeating
  participants?: Participant[][];
  votes?: { teamA: number; teamB: number };

  winner?: Winner;
}

export interface Score { }

export interface Winner {
  team?: string;
  participants?: Participant[];
}
