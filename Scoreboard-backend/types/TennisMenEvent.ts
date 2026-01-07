import Event from "./Event";
import MatchTypes from "./MatchTypes";

export default interface TennisMenEvent extends Event<TennisMenScore> {
  matchType: MatchTypes;
}

export interface TennisMenScore {
  teamA_points: number;
  teamB_points: number;
}

export const createTennisMenDefaultScore = (): TennisMenScore => ({ teamA_points: 0, teamB_points: 0 });
