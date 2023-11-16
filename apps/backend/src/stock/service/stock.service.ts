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
}
