import { Injectable } from '@nestjs/common';
import { CycleEntity } from '../models/cycle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CycleService {
  constructor(
    @InjectRepository(CycleEntity)
    private cycleRepository: Repository<CycleEntity>,
  ) {}

  async findAll(): Promise<CycleEntity[]> {
    return this.cycleRepository.find();
  }

  async getGameCyclesFromIndex(
    gameId: number,
    current_cycle_index: number,
  ): Promise<CycleEntity[]> {
    return await this.cycleRepository.find({
      where: {
        company: { game: { id: gameId } },
        current_cycle_index: current_cycle_index,
      },
      relations: ['company', 'company.game'],
    });
  }
}
