import mongoose from "mongoose";

import { AllEventsUnion } from "../types/AllEvents";

const eventSchema = new mongoose.Schema<AllEventsUnion>({
  title: { type: String, required: true },
  endTime: { type: Number, required: true },
  startTime: { type: Number, required: true },
  event: { type: String, required: true },
  isStarted: { type: Boolean, required: true },
  isCompleted: { type: Boolean, required: true },
  teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Teams" }],
  participants: [
    [
      {
        name: String,
        team: String,
        distance: Number,
        time: Number,
      },
    ],
  ],

  subtitle: String,
  matchType: String,
  score: {
    // Football
    teamA_score: Number,
    teamB_score: Number,
    // Chess, squash (men and women), tennis (men and women)
    teamA_points: Number,
    teamB_points: Number,
    // Cricket
    teamA_runs: Number,
    teamA_overs: Number,
    teamA_wickets: Number,
    teamB_runs: Number,
    teamB_overs: Number,
    teamB_wickets: Number,
  },
  winner: {
    team: { type: mongoose.SchemaTypes.ObjectId, ref: "Teams" },
    participants: [
      {
        name: String,
        team: String,
        distance: Number,
        time: Number,
      },
    ],
  },

  // Athletics only
  athleticsEventType: String,
  // cricket only
  eventLink: String,
});

const EventModel = mongoose.model("Events", eventSchema);

export default EventModel;
