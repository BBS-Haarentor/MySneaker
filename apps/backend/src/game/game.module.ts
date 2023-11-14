import { Module } from '@nestjs/common';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';

@Module({
  providers: [GameService],
  controllers: [GameController]
})
export class GameModule {}
