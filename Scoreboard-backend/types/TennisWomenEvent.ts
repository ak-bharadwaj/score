import Event from "./Event";
import MatchTypes from "./MatchTypes";

export default interface TennisWomenEvent extends Event<TennisWomenScore> {
  matchType: MatchTypes;
}

export interface TennisWomenScore {
  teamA_points: number;
  teamB_points: number;
}

export const createTennisWomenDefaultScore = (): TennisWomenScore => ({ teamA_points: 0, teamB_points: 0 });
