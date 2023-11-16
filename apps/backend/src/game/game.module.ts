import { Module } from '@nestjs/common';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './models/game.entity';
import { GameUserEntity } from './models/gameUser.entity';
import { CompanyEntity } from "../company/models/company.entity";
import { UserModule } from "../user/user.module";
import { ScenarioModule } from "../scenario/scenario.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GameEntity,
      GameUserEntity,
      CompanyEntity,
    ]),
    UserModule,
    ScenarioModule,
  ],
  providers: [GameService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
