import { Module } from '@nestjs/common';
import { CycleController } from './controller/cycle.controller';
import { CycleService } from './service/cycle.service';

@Module({
  controllers: [CycleController],
  providers: [CycleService]
})
export class CycleModule {}
