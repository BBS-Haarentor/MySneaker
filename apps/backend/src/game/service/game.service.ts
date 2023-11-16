import { HttpException, Injectable } from "@nestjs/common";
import { GameEntity } from '../models/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from '../models/dto/CreateGame.dto';
import { GameUserEntity } from '../models/gameUser.entity';
import { ScenarioService } from '../../scenario/service/scenario.service';
import { UpdateGameDto } from '../models/dto/UpdateGame.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(GameUserEntity)
    private gameUserRepository: Repository<GameUserEntity>,
    private scenarioService: ScenarioService,
  ) {}

  async createNewGame(createGameDto: CreateGameDto, userId: number) {
    const scenariosDb = await this.scenarioService.getScenarios();
    const scenarios = [];
    createGameDto.scenarios.map((scenarioId) => {
      const scenario = scenariosDb.find(
        (scenario) => scenario.id === parseInt(scenarioId),
      );
      scenarios.push(scenario);
    });
    const newGame = this.gameRepository.create({
      name: createGameDto.name,
      description: createGameDto.description,
      scenarios: scenarios,
      teacher: { id: userId },
    });
    return await this.gameRepository.save(newGame);
  }

  async getAllGames() {
    return await this.gameRepository.find({
      relations: ['scenarios'],
    });
  }

  async getGameById(id: number) {
    return await this.gameRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async checkIfIsUserInGame(gameId: number, userId: number) {
    return !(await this.gameUserRepository.findOne({
      where: {
        game: { id: gameId },
        user: { id: userId },
      },
      relations: ['user', 'game'],
    }));
  }

  async getAllGamesForUser(userId: number) {
    return await this.gameUserRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['game'],
    });
  }

  async updateGame(body: UpdateGameDto, id: number) {}

  async deleteGame(gameId: number, id: number) {
    const game = await this.gameRepository.findOne({
      where: {
        id: gameId,
      },
      relations: ['teacher'],
    });
    if (!game) {
      throw new HttpException('Game not found', 404);
    }
    if (game.teacher.id !== id) {
      throw new HttpException('You are not allowed to delete this game', 403);
    }
    await this.gameRepository.remove(game);
    return {
      message: 'Game deleted successfully',
    };
  }

  async addUserToGame(gameId: number, userId: number) {
    const userEntity = this.gameUserRepository.create({
      game: { id: gameId },
      user: { id: userId },
    });
    await this.gameUserRepository.save(userEntity);
    return {
      message: 'User added to game successfully',
    };
  }
}
