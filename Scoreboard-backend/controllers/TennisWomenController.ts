import { Body, Deprecated, Path, Put, Response, Route, Tags } from "tsoa";

import TennisWomenScoreUpdateRequest from "../requests/TennisWomenScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("api/events/tenniswomen")
@Tags("Events", "TennisWomen")
export class TennisWomenController {
  /**
   * Updates the score for a tennis women's match.
   *
   * @param id - The ID of the match.
   * @param score - The updated score for the match.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  @Deprecated()
  public async updateScore(@Path("id") id: string, @Body() score: TennisWomenScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
