import mongoose from "mongoose";

const globalConfigSchema = new mongoose.Schema({
    tickerText: { type: String, default: "" },
    lastBroadcastMessage: { type: String, default: "" },
    lastBroadcastDuration: { type: Number, default: 0 },
    featuredEventId: { type: String, default: "" },
});

const GlobalConfigModel = mongoose.model("GlobalConfig", globalConfigSchema);

export default GlobalConfigModel;
