import { Score } from "./Event";

export default interface HistoryItem<T extends Score> {
  eventID: string;
  userName: string;
  prevScore: T;
  currentScore: T;
  timestamp?: number;
}
