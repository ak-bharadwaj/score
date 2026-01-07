import { Body, Deprecated, Path, Put, Response, Route, Tags } from "tsoa";

import TennisMenScoreUpdateRequest from "../requests/TennisMenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("api/events/tennismen")
@Tags("Events", "TennisMen")
export class TennisMenController {
  /**
   * Updates the score for a tennis men's match.
   *
   * @param id - The ID of the match.
   * @param score - The updated score for the match.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  @Deprecated()
  public async updateScore(@Path("id") id: string, @Body() score: TennisMenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
