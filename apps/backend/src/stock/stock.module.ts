import { Module } from '@nestjs/common';
import { StockController } from './controller/stock.controller';
import { StockService } from './service/stock.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockEntity } from "./models/stock.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity]),
    UserModule
  ],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
