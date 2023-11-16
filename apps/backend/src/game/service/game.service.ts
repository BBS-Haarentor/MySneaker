import { HttpException, Injectable } from '@nestjs/common';
import { GameEntity } from '../models/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from '../models/dto/CreateGame.dto';
import { GameUserEntity } from '../models/gameUser.entity';
import { ScenarioService } from '../../scenario/service/scenario.service';
import { UpdateGameDto } from '../models/dto/UpdateGame.dto';
import { CycleService } from '../../cycle/service/cycle.service';
import { StockService } from '../../stock/service/stock.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(GameUserEntity)
    private gameUserRepository: Repository<GameUserEntity>,
    private scenarioService: ScenarioService,
    private readonly cycleService: CycleService,
    private readonly stockService: StockService,
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
      relations: ['scenarios', 'teacher'],
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

  async turnover(gameId: number, userId: number) {
    const game = await this.getGameById(gameId);
    console.log('game:', game);
    const cycles = await this.cycleService.getGameCyclesFromIndex(
      gameId,
      game.cycle_index,
    );
    const stocks = await this.stockService.getStockByGameIdAndCycleIndex(
      gameId,
      game.cycle_index,
    );
    const scenario = game.scenarios[game.cycle_index];

    const cyclesSort = cycles.sort((a, b) => a.id - b.id);
    const stocksSort = stocks.sort((a, b) => a.id - b.id);

    let newCycles = cyclesSort;
    let newStocks = stocksSort;

    // buy stock
    for (let i = 0; i < cyclesSort.length; i++) {
      let currentCycle = cyclesSort[i];
      let currentStock = stocksSort[i];
      let newStock = newStocks[i];
      //buy sneaker
      newStock.sneaker_count += currentCycle.buy_sneaker;
      newStock.account_balance -=
        currentCycle.buy_sneaker * scenario.sneaker_price;
      //buy paint
      newStock.paint_count += currentCycle.buy_paint;
      newStock.account_balance -=
        currentCycle.buy_paint * scenario.sneaker_price;

      //pay employee
      newStock.account_balance -=
        scenario.employee_salary * currentStock.employees_count;
      newStock.account_balance -=
        scenario.employee_salary *
        currentStock.employees_count *
        scenario.employee_cost_modfier;

      //TODO: Maschienen logic machen

      newStock.employees_count +=
        currentCycle.new_employees - currentCycle.let_go_employees;

      let research_levels = [1,0.9, 0.82, 0.76, 0.72, 0.7];
      newStock.research_budget += currentCycle.research_invest;
      newStock.research_production_modifier = research_levels[Math.floor(currentStock.research_budget/2500)]

      newStock.credit_taken += currentCycle.take_credit
      newStock.account_balance += currentCycle.take_credit
      newStock.credit_taken -= currentCycle.payback_credit
      newStock.account_balance -= currentCycle.payback_credit
    }

    console.log('cyclesSort:', cyclesSort);
    console.log('stocksSort:', stocksSort);
    console.log('scenario:', scenario);
  }
}
