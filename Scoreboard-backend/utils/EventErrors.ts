export const EventNotFound = new Error("No Such Event Exists");
export const EventScoreDoesntExist = new Error("Event Score doesn't exist");
export const EventCompleted = new Error("Event is already completed");
export const CantStartEventBeforeTime = new Error("Can't start event before time");
export const CantStopEvenBeforeTime = new Error("Can't stop the event before time");
export const ParticipantsNotProvided = new Error("Participants not provided");
export const EventNotStarted = new Error("Event is not started");
