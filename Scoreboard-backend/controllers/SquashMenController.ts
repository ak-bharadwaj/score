import { Body, Deprecated, Path, Put, Response, Route, Tags } from "tsoa";

import SquashMenScoreUpdateRequest from "../requests/SquashMenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("api/events/squashmen")
@Tags("Events", "SquashMen")
export class SquashMenController {
  /**
   * Updates the score for a Squash Men match.
   *
   * @param id - The ID of the match.
   * @param score - The updated score for the match.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  @Deprecated()
  public async updateScore(@Path("id") id: string, @Body() score: SquashMenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
