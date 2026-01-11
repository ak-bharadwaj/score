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
import { CantStartEventBeforeTime, CantStopEvenBeforeTime, EventCompleted, EventNotFound, EventScoreDoesntExist, ParticipantsNotProvided } from "./EventErrors";
import Participant from "../types/Participant";
import { isOrderedAscending } from "./AthleticEventUtils";

export function getEventDefaultScore(eventCategory: string) {
  const category = (eventCategory || "").toLowerCase();

  if (category.includes("cricket")) return createCricketDefaultScore;
  if (category.includes("chess")) return createChessDefaultScore;
  if (category.includes("squash")) {
    return category.includes("women") ? createSquashWomenDefaultScore : createSquashMenDefaultScore;
  }
  if (category.includes("tennis")) {
    return category.includes("women") ? createTennisWomenDefaultScore : createTennisMenDefaultScore;
  }
  if (category.includes("athletics")) return createAthleticsDefaultScore;

  // For Football, Basketball, Volleyball, etc.
  return createFootballDefaultScore;
}

export async function addEvent<T extends Event<U>, U extends Score>(eventCategory: string, eventData: T) {
  const defaultScoreFn = getEventDefaultScore(eventCategory);
  const now = Date.now();
  const startTime = eventData.startTime || now;
  const endTime = eventData.endTime || (startTime + 3600000 * 2); // Default 2 hours duration

  const eventModel = await EventModel.create<T>({
    ...eventData,
    startTime,
    endTime,
    teams: eventData.teams.map(team => new mongoose.Types.ObjectId(team)),
    isCompleted: false,
    isStarted: false,
    score: defaultScoreFn(),
  });
  await eventModel.save();
  return eventModel;
}

import GlobalConfigModel from "../schemas/GlobalConfigModel";

export const readEvents = async () => (await EventModel.find<AllEvents>().sort({ createdAt: 1 }).populate("teams").populate("winner.team")).map(event => event as AllEvents);

export const deleteEvent = async (eventID: string) => {
  const res = await EventModel.findByIdAndDelete(eventID);

  // If this was the featured event, reset it
  const config = await GlobalConfigModel.findOne();
  if (config && config.featuredEventId === eventID) {
    config.featuredEventId = "";
    await config.save();
    SocketServer.io.sockets.emit("featuredEventUpdate", { eventId: "" });
  }

  SocketServer.io.sockets.emit("eventsUpdated");
  return res;
};

export const getLiveEvents = async () => await EventModel.find<AllEvents>().where("isStarted").equals(true).sort({ createdAt: -1 }).populate("teams").populate("winner.team");

export const getEventByID = async <T extends Event<U>, U extends Score>(id: string) => await EventModel.findById<T>(id).populate("teams").populate("winner.team");

export const toggleEventStarted = async (id: string) => {
  let event = await getEventByID<AllEvents, AllScores>(id);
  if (!event) throw EventNotFound;
  if (event.isCompleted) {
    console.warn(`Attempted to toggle completed event: ${id}`);
    throw EventCompleted;
  }

  if (event.isStarted) {
    event.isCompleted = true;
    event.endTime = Date.now();
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
      winner: event.winner,
      isCompleted: event.isCompleted,
    })
  );
  SocketServer.io.sockets.emit("eventsUpdated");
  return await EventModel.findByIdAndUpdate(id, {
    isStarted: event.isStarted,
    isCompleted: event.isCompleted,
    endTime: event.endTime,
    winner: event.winner
  });
};

export const markEventAsCompleted = async (id: string) => {
  const res = await EventModel.findByIdAndUpdate(id, { isCompleted: true });
  SocketServer.io.sockets.emit("eventsUpdated");
  return res;
};

export const updateScore = async (id: string, score: any) => {
  const event = await getEventByID<AllEvents, AllScores>(id);
  if (!event) throw EventNotFound;
  // Note: we allow score updates even if not started or if completed for corrections
  SocketServer.io.sockets.in(event._id!.toString()).emit(`scoreUpdate/${event._id!.toString()}`, JSON.stringify(score));
  await EventModel.findByIdAndUpdate(id, { score });
  console.log(`Score updated for event ${id}`);
};

export const deleteNotCompletedEvents = async () => await EventModel.deleteMany({ isCompleted: false, isStarted: false });

export const getNotCompletedEvents = async () => await EventModel.find().where("isCompleted").equals(false);

export async function updateExistingEvents(events: AllEvents[]) {
  const incomingIds = events.map(e => e._id).filter((id): id is string => !!id);

  // 1. Process all incoming events
  await Promise.all(events.map(async eventData => {
    const teams = (await Promise.all(eventData.teams.map(async team => await getTeamID(team))))
      .filter((t): t is string => t !== null);

    // We remove _id from fields to avoid Mongo error when updating
    const { _id, ...fieldsToUpdate } = eventData as any;

    if (_id) {
      // Update existing
      await EventModel.findByIdAndUpdate(_id, {
        ...fieldsToUpdate,
        teams
      });
    } else {
      // Create new
      const newEvent = new EventModel({
        ...fieldsToUpdate,
        teams
      });
      await newEvent.save();
      incomingIds.push(newEvent._id.toString());
    }
  }));

  // 2. Delete events that were NOT in the incoming list AND are not started/completed
  await EventModel.deleteMany({
    _id: { $nin: incomingIds.map(id => new mongoose.Types.ObjectId(id)) },
    isStarted: false,
    isCompleted: false
  });

  SocketServer.io.sockets.emit("eventsUpdated");
}

export const setWinner = async (eventID: string, winningTeamID?: string, participants?: Participant[]) => {
  let event = (await getEventByID(eventID)) as AthleticsEvent;
  if (!event) throw EventNotFound;

  if (event.event === EventCatagories.ATHLETICS) {
    if (!participants) throw ParticipantsNotProvided;

    participants.sort((a, b) => (!isOrderedAscending(event.athleticsEventType) ? b.distance! - a.distance! : a.time! - b.time!));
  }

  const updated = await EventModel.findByIdAndUpdate(eventID, {
    winner: { team: !!winningTeamID ? new mongoose.Types.ObjectId(winningTeamID) : undefined, participants },
  });
  SocketServer.io.sockets.emit("eventsUpdated");
  return updated;
};

export const deleteAllEvents = async () => {
  await EventModel.deleteMany({});
  SocketServer.io.sockets.emit("eventsUpdated");
};

export const updateVote = async (id: string, team: 'A' | 'B', action: 'add' | 'remove') => {
  const event = await EventModel.findById(id);
  if (!event) throw EventNotFound;

  // Initialize votes if they don't exist
  if (!event.votes) {
    event.votes = { teamA: 0, teamB: 0 };
  }

  const change = action === 'add' ? 1 : -1;
  if (team === 'A') {
    event.votes.teamA = Math.max(0, (event.votes.teamA || 0) + change);
  } else {
    event.votes.teamB = Math.max(0, (event.votes.teamB || 0) + change);
  }

  await event.save();

  SocketServer.io.sockets.in(id).emit(`voteUpdate/${id}`, JSON.stringify(event.votes));
};
