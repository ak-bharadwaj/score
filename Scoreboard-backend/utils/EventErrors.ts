export const EventNotFound = new Error("No Such Event Exists");
export const EventScoreDoesntExist = new Error("Event Score doesn't exist");
export const EventCompleted = new Error("Match is already completed. Use Results Correction to edits scores.");
export const CantStartEventBeforeTime = new Error("Can't start event before time");
export const CantStopEvenBeforeTime = new Error("Can't stop the event before time");
export const ParticipantsNotProvided = new Error("Participants not provided");
export const EventNotStarted = new Error("This action requires the match to be live.");
