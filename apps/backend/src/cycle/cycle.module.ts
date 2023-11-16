import { Module } from '@nestjs/common';
import { CycleController } from './controller/cycle.controller';
import { CycleService } from './service/cycle.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CycleEntity } from "./models/cycle.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CycleEntity])
  ],
  controllers: [CycleController],
  providers: [CycleService],
  exports: [CycleService],
})
export class CycleModule {}
