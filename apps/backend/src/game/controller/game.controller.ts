import { Controller, Get } from "@nestjs/common";
import { GameService } from "../service/game.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  getStatus(): {message: string, version: string} {
    return {
      message: 'API running',
      version: process.env.npm_package_version,
    };
  }
}
