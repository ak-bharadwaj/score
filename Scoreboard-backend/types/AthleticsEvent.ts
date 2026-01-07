import Event from "./Event";
import AthleticsEventTypes from "./AthleticsEventTypes";

export default interface AthleticsEvent extends Event<AthleticsEventScore> {
  athleticsEventType: AthleticsEventTypes;
}

export interface AthleticsEventScore {}

export const createAthleticsDefaultScore = () => {};
