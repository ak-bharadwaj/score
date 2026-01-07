import AthleticsEvent, { AthleticsEventScore } from "./AthleticsEvent";
import ChessEvent, { ChessScore } from "./ChessEvent";
import CricketEvent, { CricketScore } from "./CricketEvent";
import FootballEvent, { FootballScore } from "./FootballEvent";
import SquashMenEvent, { SquashMenScore } from "./SquashMenEvent";
import SquashWomenEvent, { SquashWomenScore } from "./SquashWomenEvent";
import TennisMenEvent, { TennisMenScore } from "./TennisMenEvent";
import TennisWomenEvent, { TennisWomenScore } from "./TennisWomenEvent";

type AllEvents = FootballEvent | ChessEvent | CricketEvent | SquashMenEvent | SquashWomenEvent | TennisMenEvent | TennisWomenEvent | AthleticsEvent;
export type AllEventsUnion = FootballEvent & ChessEvent & CricketEvent & SquashMenEvent & SquashWomenEvent & TennisMenEvent & TennisWomenEvent & AthleticsEvent;
export type AllScores = FootballScore | ChessScore | CricketScore | SquashMenScore | SquashWomenScore | TennisMenScore | TennisWomenScore | AthleticsEventScore;
export type AllScoresExceptCricketAndAthletics = FootballScore | ChessScore | SquashMenScore | SquashWomenScore | TennisMenScore | TennisWomenScore;

export default AllEvents;
