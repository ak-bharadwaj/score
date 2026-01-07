import Event from "./Event";

export default interface SquashWomenEvent extends Event<SquashWomenScore> {}

export interface SquashWomenScore {
  teamA_points: number;
  teamB_points: number;
}

export const createSquashWomenDefaultScore = (): SquashWomenScore => ({ teamA_points: 0, teamB_points: 0 });
