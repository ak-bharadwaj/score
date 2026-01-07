import { Body, Deprecated, Path, Put, Response, Route, Tags } from "tsoa";

import ChessScoreUpdateRequest from "../requests/ChessScoreUpdateRequest";
import { updateScore } from "../utils/EventUtils";

@Route("api/events/chess")
@Tags("Events", "Chess")
export class ChessController {
  /**
   * Updates the score for a chess game.
   *
   * @param id - The ID of the chess game.
   * @param score - The updated score for the chess game.
   * @returns A promise that resolves to the updated score.
   */
  @Put("/:id")
  @Response(204)
  @Deprecated()
  public async updateScore(@Path("id") id: string, @Body() score: ChessScoreUpdateRequest) {
    return await updateScore(id, score);
  }
}
