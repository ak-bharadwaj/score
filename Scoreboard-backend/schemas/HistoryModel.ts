import mongoose from "mongoose";

import HistoryItem from "../types/HistoryItem";
import { AllScores } from "../types/AllEvents";

const HistoryItemSchema = new mongoose.Schema<HistoryItem<AllScores>>({
  eventID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },

  prevScore: {
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
  currentScore: {
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

  timestamp: {
    type: Number,
    immutable: true,
    default: () => Date.now(),
  },
});

const HistoryModel = mongoose.model("ScoreUpdateHistory", HistoryItemSchema);

export default HistoryModel;
