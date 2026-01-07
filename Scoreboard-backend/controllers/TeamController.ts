import { Body, Delete, Get, Patch, Path, Post, Response, Route, Tags } from "tsoa";

import CreateTeamRequest from "../requests/CreateTeamRequest";
import { addTeam, deleteTeam, getAllTeams, getTeamByName } from "../utils/TeamUtils";

@Route("api/admin/teams")
@Tags("Teams")
export class TeamControllers {
  /**
   * Retrieves all teams.
   */
  @Get("")
  public async getAllTeams() {
    return await getAllTeams();
  }

  /**
   * Retrieves a team by its name.
   * @param name The name of the team.
   * @returns The team with the specified name.
   */
  @Get("/:name")
  public async getTeamByName(@Path("name") name: string) {
    return await getTeamByName(name);
  }

  /**
   * Adds a team.
   *
   * @param name - The name of the team.
   */
  @Post("")
  public async addTeam(@Body() { name }: CreateTeamRequest) {
    await addTeam(name);
  }

  /**
   * Deletes a team.
   * @param id - The ID of the team to be deleted.
   */
  @Delete("/:id")
  public async deleteTeam(@Path("id") id: string) {
    await deleteTeam(id);
  }

  /**
   * Adds a medal to a team.
   *
   * @param medal - The type of medal to add.
   * @param name - The name of the team.
   */
  @Patch("/:name/:medal")
  @Response(204)
  public async addMedal(@Path("medal") medal: string, @Path("name") name: string) {
    await this.addMedal(medal, name);
  }
}
