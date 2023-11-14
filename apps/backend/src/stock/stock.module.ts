import { Module } from '@nestjs/common';
import { StockController } from './controller/stock.controller';
import { StockService } from './service/stock.service';

@Module({
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
