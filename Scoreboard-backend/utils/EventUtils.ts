import mongoose from "mongoose";

import EventCatagories from "../types/EventCategories";
import EventModel from "../schemas/EventModel";
import AllEvents, { AllScores, AllScoresExceptCricketAndAthletics } from "../types/AllEvents";
import Event, { Score } from "../types/Event";
import { SocketServer } from "../types/SocketServer";
import { createFootballDefaultScore } from "../types/FootballEvent";
import { createChessDefaultScore } from "../types/ChessEvent";
import { getTeamById, getTeamID } from "./TeamUtils";
import { createCricketDefaultScore } from "../types/CricketEvent";
import { createSquashMenDefaultScore } from "../types/SquashMenEvent";
import { createSquashWomenDefaultScore } from "../types/SquashWomenEvent";
import { createTennisMenDefaultScore } from "../types/TennisMenEvent";
import { createTennisWomenDefaultScore } from "../types/TennisWomenEvent";
import AthleticsEvent, { createAthleticsDefaultScore } from "../types/AthleticsEvent";
import { CantStartEventBeforeTime, CantStopEvenBeforeTime, EventCompleted, EventNotFound, EventNotStarted, EventScoreDoesntExist, ParticipantsNotProvided } from "./EventErrors";
import Participant from "../types/Participant";
import { isOrderedAscending } from "./AthleticEventUtils";

export const getEventDefaultScore = (eventCatagory: EventCatagories) => {
  switch (eventCatagory) {
    case EventCatagories.FOOTBALL:
      return createFootballDefaultScore;
    case EventCatagories.CHESS:
      return createChessDefaultScore;
    case EventCatagories.CRICKET:
      return createCricketDefaultScore;
    case EventCatagories.SQUASH_MEN:
      return createSquashMenDefaultScore;
    case EventCatagories.SQUASH_WOMEN:
      return createSquashWomenDefaultScore;
    case EventCatagories.TENNIS_WOMEN:
      return createTennisWomenDefaultScore;
    case EventCatagories.TENNIS_MEN:
      return createTennisMenDefaultScore;
    case EventCatagories.ATHLETICS:
      return createAthleticsDefaultScore;
    case EventCatagories.BASKETBALL:
    case EventCatagories.VOLLEYBALL:
    case EventCatagories.TABLE_TENNIS:
    case EventCatagories.BADMINTON:
    case EventCatagories.HANDBALL:
    case EventCatagories.BALL_BADMINTON:
    case EventCatagories.KABADDI:
    case EventCatagories.THROWBALL:
    case EventCatagories.RUGBY:
      return createFootballDefaultScore;
  }
};

export const addEvent = async <T extends Event<U>, U extends Score>(eventCatogory: EventCatagories, eventData: T) => {
  const eventModel = await EventModel.create<T>({
    ...eventData,
    teams: eventData.teams.map(team => new mongoose.Types.ObjectId(team)),
    isCompleted: false,
    isStarted: false,
    score: getEventDefaultScore(eventCatogory)(),
  });
  await eventModel.save();
  return eventModel;
};

export const readEvents = async () => (await EventModel.find<AllEvents>().populate("teams").populate("winner.team")).map(event => event as AllEvents);

export const deleteEvent = async (eventID: string) => await EventModel.findByIdAndDelete(eventID);

export const getLiveEvents = async () => await EventModel.find<AllEvents>().where("isStarted").equals(true);

export const getEventByID = async <T extends Event<U>, U extends Score>(id: string) => await EventModel.findById<T>(id);

export const toggleEventStarted = async (id: string) => {
  let event = await getEventByID<AllEvents, AllScores>(id);
  if (!event) throw EventNotFound;
  if (event.isCompleted) throw EventCompleted;

  if (event.isStarted) {
    event.isCompleted = true;
    if (event.event !== EventCatagories.ATHLETICS && event.event !== EventCatagories.CRICKET) {
      if (!event.score) throw EventScoreDoesntExist;

      let winningTeamIndex = 0;
      let score = event.score as AllScoresExceptCricketAndAthletics;
      if (score.teamA_points === score.teamB_points) winningTeamIndex = -1;
      if (score.teamA_points < score.teamB_points) winningTeamIndex = 1;

      if (winningTeamIndex !== -1) event.winner = { team: event.teams[winningTeamIndex] };
      if (!!event.participants && winningTeamIndex !== -1) {
        event.winner = { ...event.winner, participants: event.participants[winningTeamIndex] };
      }
    }
  }

  event.isStarted = !event.isStarted;
  SocketServer.io.sockets.emit(
    "eventStartOrEnd",
    JSON.stringify({
      eventID: event._id,
      isStarted: event.isStarted,
      winner: { ...event.winner, team: await getTeamById(event.winner?.team!) },
      isCompleted: event.isCompleted,
    })
  );
  return await EventModel.findByIdAndUpdate(id, event);
};

export const markEventAsCompleted = async (id: string) => await EventModel.findByIdAndUpdate(id, { isCompleted: true });

export const updateScore = async (id: string, score: any) => {
  const event = await getEventByID<AllEvents, AllScores>(id);
  if (!event) throw EventNotFound;
  if (!event.isStarted) throw EventNotStarted;
  SocketServer.io.sockets.in(event._id!.toString()).emit(`scoreUpdate/${event._id!.toString()}`, JSON.stringify(score));
  await EventModel.findByIdAndUpdate(id, { score });
};

export const deleteNotCompletedEvents = async () => await EventModel.deleteMany({ isCompleted: false, isStarted: false });

export const getNotCompletedEvents = async () => await EventModel.find().where("isCompleted").equals(false);

export const updateExistingEvents = async (events: AllEvents[]) => {
  await deleteNotCompletedEvents();
  events.forEach(async event => addEvent(event.event, { ...event, teams: await Promise.all(event.teams.map(async team => await getTeamID(team))) }));
};

export const setWinner = async (eventID: string, winningTeamID?: string, participants?: Participant[]) => {
  let event = (await getEventByID(eventID)) as AthleticsEvent;
  if (!event) throw EventNotFound;

  if (event.event === EventCatagories.ATHLETICS) {
    if (!participants) throw ParticipantsNotProvided;

    participants.sort((a, b) => (!isOrderedAscending(event.athleticsEventType) ? b.distance! - a.distance! : a.time! - b.time!));
  }

  return await EventModel.findByIdAndUpdate(eventID, {
    winner: { team: !!winningTeamID ? new mongoose.Types.ObjectId(winningTeamID) : undefined, participants },
  });
};
