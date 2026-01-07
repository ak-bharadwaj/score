import { Body, Deprecated, Path, Put, Response, Route, Tags } from "tsoa";

import CricketScoreUpdateRequest from "../requests/CricketScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("api/events/cricket")
@Tags("Events", "Cricket")
export class CricketController {
  /**
   * Updates the score for a cricket match.
   *
   * @param id - The ID of the match.
   * @param score - The updated score.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  @Deprecated()
  public async updateScore(@Path("id") id: string, @Body() score: CricketScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
