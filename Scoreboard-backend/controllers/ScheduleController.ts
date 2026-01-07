import { Body, Get, Patch, Response, Route, Tags } from "tsoa";
import { getNotCompletedEvents, updateExistingEvents } from "../utils/EventUtils";
import UpdateExistingEventsRequest from "../requests/UpdateExistingEventsRequest";

@Route("api/admin/schedule")
@Tags("Admin", "Schedule")
export class ScheduleController {
  /**
   * Retrieves the list of not completed events.
   * @returns {Promise<any>} The list of not completed events.
   */
  @Get("/")
  public async getNotCompletedEvents() {
    return await getNotCompletedEvents();
  }

  /**
   * Updates existing events.
   * @param events The events to be updated.
   */
  @Response(204)
  @Patch("/")
  public async updateExistingEvents(@Body() { events }: UpdateExistingEventsRequest) {
    await updateExistingEvents(events);
  }
}
