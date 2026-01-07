import Event from "./Event";

export default interface CricketEvent extends Event<CricketScore> {
  eventLink: string;
}

export interface CricketScore {
  teamA_runs: number;
  teamA_overs: number;
  teamA_wickets: number;
  teamB_runs: number;
  teamB_overs: number;
  teamB_wickets: number;
}

export const createCricketDefaultScore = (): CricketScore => ({
  teamA_overs: 0,
  teamA_runs: 0,
  teamA_wickets: 0,
  teamB_overs: 0,
  teamB_runs: 0,
  teamB_wickets: 0,
});
