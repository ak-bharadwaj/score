import { Body, Get, Post, Route, Tags } from "tsoa";
import GlobalConfigModel from "../schemas/GlobalConfigModel";
import { SocketServer } from "../types/SocketServer";

@Route("api/global")
@Tags("Global")
export class GlobalController {
    @Post("/broadcast")
    public async broadcast(@Body() body: { message: string; duration: number }) {
        SocketServer.io.sockets.emit("broadcastAlert", body);
    }

    @Post("/ticker")
    public async updateTicker(@Body() body: { text: string }) {
        let config = await GlobalConfigModel.findOne();
        if (!config) {
            config = new GlobalConfigModel();
        }
        config.tickerText = body.text;
        await config.save();

        SocketServer.io.sockets.emit("tickerUpdate", { text: body.text });
    }

    @Get("/config")
    public async getConfig() {
        let config = await GlobalConfigModel.findOne();
        if (!config) {
            config = await GlobalConfigModel.create({ tickerText: "" });
        }
        return config;
    }
}
