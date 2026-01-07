import AllEvents from "../types/AllEvents";
import Event from "../types/Event";

export default interface UpdateExistingEventsRequest {
  events: AllEvents[];
}
