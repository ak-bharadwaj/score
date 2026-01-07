import { Body, Deprecated, Path, Put, Response, Route, Tags } from "tsoa";

import SquashWomenScoreUpdateRequest from "../requests/SquashWomenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("api/events/squashwomen")
@Tags("Events", "SquashWomen")
export class SquashWomenController {
  /**
   * Updates the score for a Squash Women match.
   *
   * @param id - The ID of the match.
   * @param score - The updated score for the match.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  @Deprecated()
  public async updateScore(@Path("id") id: string, @Body() score: SquashWomenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
