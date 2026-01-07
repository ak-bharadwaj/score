import Event from "./Event";

export default interface FootballEvent extends Event<FootballScore> {}

export interface FootballScore {
  teamA_points: number;
  teamB_points: number;
}

export const createFootballDefaultScore = (): FootballScore => ({ teamA_points: 0, teamB_points: 0 });
