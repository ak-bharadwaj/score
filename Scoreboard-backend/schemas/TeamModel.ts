import { Schema, model } from "mongoose";

import Team from "../types/Teams";

const teamSchema = new Schema<Team>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  medals: {
    gold: {
      type: Number,
      required: true,
    },
    silver: {
      type: Number,
      required: true,
    },
    bronze: {
      type: Number,
      required: true,
    },
  },
  points: {
    type: Number,
    required: true,
  },
});

const TeamModel = model<Team>("Teams", teamSchema);
export default TeamModel;
