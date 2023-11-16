import { Module } from '@nestjs/common';
import { ScenarioService } from './service/scenario.service';
import { ScenarioController } from './controller/scenario.controller';
import { ScenarioEntity } from "./models/scenario.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";

@Module({
  providers: [ScenarioService],
  controllers: [ScenarioController],
  imports: [
    TypeOrmModule.forFeature([ScenarioEntity]),
    UserModule,
  ],
  exports: [ScenarioService],
})
export class ScenarioModule {}
