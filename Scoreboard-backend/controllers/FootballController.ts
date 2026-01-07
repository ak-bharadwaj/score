import { Body, Deprecated, Path, Put, Response, Route, Tags } from "tsoa";

import FootballScoreUpdateRequest from "../requests/FootballScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("api/events/football")
@Tags("Events", "Football")
export class FootballController {
  /**
   * Updates the score for a football match.
   *
   * @param id - The ID of the football match.
   * @param score - The updated score for the match.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  @Deprecated()
  public async updateScore(@Path("id") id: string, @Body() score: FootballScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
