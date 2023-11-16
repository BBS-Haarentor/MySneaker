import { Injectable } from '@nestjs/common';
import { StockEntity } from "../models/stock.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  async getAllStocks() {
    return await this.stockRepository.find();
  }

  async getStockByGameIdAndCycleIndex(gameId: number, cycle_index: number) {
    return await this.stockRepository.find({
      where: {
        company: { game: { id: gameId } },
        current_cycle_index: cycle_index,
      },
      relations: ['company', 'company.game'],
    });
  }
}
