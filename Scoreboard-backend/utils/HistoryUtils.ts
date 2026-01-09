import HistoryModel from "../schemas/HistoryModel";
import HistoryItem from "../types/HistoryItem";
import { Score } from "../types/Event";
import { AllScores } from "../types/AllEvents";

export const getScoreChangeLogs = async (): Promise<HistoryItem<any>[]> => await HistoryModel.find<HistoryItem<any>>();

export const saveHistory = async <T extends Score>(eventID: string, prevScore: T | undefined, currentScore: T, userName: string) => {
  if (!eventID || !userName) return;
  const historyItem: Partial<HistoryItem<T>> = {
    eventID,
    userName,
    prevScore: prevScore || currentScore, // Fallback if no prev score
    currentScore
  };
  const newHistoryItem = new HistoryModel(historyItem);

  return await newHistoryItem.save();
};
