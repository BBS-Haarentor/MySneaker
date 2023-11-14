import { Module } from '@nestjs/common';
import { ScenarioService } from './service/scenario.service';
import { ScenarioController } from './controller/scenario.controller';

@Module({
  providers: [ScenarioService],
  controllers: [ScenarioController]
})
export class ScenarioModule {}
