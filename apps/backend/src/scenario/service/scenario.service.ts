import { HttpException, Injectable } from '@nestjs/common';
import { ScenarioEntity } from '../models/scenario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScenarioSeed } from '../database/scenario.seed';
import { CreateScenarioDto } from "../models/dto/CreateScenario.dto";

@Injectable()
export class ScenarioService {
  constructor(
    @InjectRepository(ScenarioEntity)
    private scenarioRepository: Repository<ScenarioEntity>,
  ) {}

  async getScenarios() {
    return await this.scenarioRepository.find();
  }

  async getScenarioById(id: number) {
    const scenario = await this.scenarioRepository.findOne({
      where: {
        id,
      },
    });
    if (!scenario) {
      throw new HttpException('Scenario not found', 404);
    }
    return scenario;
  }

  async seedDefaultScenario() {
    return ScenarioSeed.map(async (scenario) => {
      return await this.scenarioRepository.save(scenario);
    });
  }

  async createScenario(scenario: CreateScenarioDto) {
    await this.scenarioRepository.save(scenario);
    return {
      message: 'Scenario created successfully',
    }
  }

  async deleteScenarioById(id: number) {
    const scenario = await this.scenarioRepository.findOne({
      where: {
        id,
      },
    });
    if (!scenario) {
      throw new HttpException('Scenario not found', 404);
    }
    await this.scenarioRepository.remove(scenario);
    return {
      message: 'Scenario deleted successfully',
    }
  }

  async updateScenarioById(id: number, scenario: CreateScenarioDto) {
    await this.scenarioRepository.update(id, scenario);
    return {
      message: 'Scenario updated successfully',
    }
  }
}
