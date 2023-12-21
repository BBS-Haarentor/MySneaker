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

    const companys = cycles.map((cycle)=>{
      let stock = stocks.find((stock)=> {return stock.company == cycle.company})
      return {
        id: cycle.company,
        cycle: cycle,
        stock: stock,
        newStock: JSON.parse(JSON.stringify(stock)),
      }
    })


// buy stock
    companys.map((company)=>{
      //TODO: Rework to infinite machines
      let machines = [];
      /*machines.push( this.scenarioService.getMachineById(company.stock.machine_1_space));
      machines.push( this.scenarioService.getMachineById(company.stock.machine_2_space));
      machines.push( this.scenarioService.getMachineById(company.stock.machine_3_space));
    */

      machines.push({
        id: 1,
        name:"",
        purchase_cost:12000,
        maintainance_cost: 4000,
        production_cost_per_sneaker:60
      })
      //buy sneaker
      company.newStock.sneaker_count += company.cycle.buy_sneaker;
      company.newStock.account_balance -=
          company.cycle.buy_sneaker * scenario.sneaker_price;
      //buy paint
      company.newStock.paint_count += company.cycle.buy_paint;
      company.newStock.account_balance -=
          company.cycle.buy_paint * scenario.paint_price;

      //pay employee
      company.newStock.account_balance -=
          scenario.employee_salary * company.stock.employees_count;
      company.newStock.account_balance -=
          scenario.employee_salary *
          company.stock.employees_count *
          scenario.employee_cost_modfier;

      //TODO: Maschienen logic rework auf infinite machines (DB changes)


      for (let j = 0; j < machines.length; j++) {
        let machine = machines[j];
        let plannedProduction = company.cycle["planned_production_" + (j+1)];
        if (machine){
          company.newStock.account_balance -= machine.maintainance_cost;
          company.newStock.account_balance -= machine.production_cost_per_sneaker * plannedProduction;
          company.newStock.finished_sneaker_count += plannedProduction;
          company.newStock.paint_count -= plannedProduction * 2;
          company.newStock.sneaker_count -= plannedProduction;
        }
      }

      if (company.cycle.buy_new_machine){

        company.newStock.account_balance -= machines.filter((m)=>
            company.cycle.buy_new_machine === m.id)[0].purchase_cost;
        if (!company.stock.machine_2_space){
          company.newStock.machine_2_space = company.cycle.buy_new_machine;
        }else if (!company.stock.machine_3_space){
          company.newStock.machine_3_space = company.cycle.buy_new_machine;
        }

      }


      company.newStock.employees_count +=
          company.cycle.new_employees - company.cycle.let_go_employees;

      company.newStock.account_balance -= company.cycle.ad_invest;

      let research_levels = [1,0.9, 0.82, 0.76, 0.72, 0.7];
      company.newStock.research_budget += company.cycle.research_invest;
      company.newStock.research_production_modifier = research_levels[Math.floor(company.stock.research_budget/2500)]

      company.newStock.credit_taken += company.cycle.take_credit
      company.newStock.account_balance += company.cycle.take_credit
      company.newStock.credit_taken -= company.cycle.payback_credit
      company.newStock.account_balance -= company.cycle.payback_credit
      if (company.stock.credit_taken > 0){
        company.newStock.account_balance -= company.stock.credit_taken * scenario.factor_interest_rate
      }

      //TODO: make function for this
    })




//TODO: make deep copy
    /*let tempCycles = JSON.parse(JSON.stringify(newCycles));
    let raminingSales = scenario.sneaker_ask;
    let adPropotion = raminingSales * 0.10;
    if (tempCycles.find((c) => c.ad_invest > 0) !== undefined) {
        let sum = 0;
        let relavantCycles = tempCycles.filter((c) => c.ad_invest > 0);
        relavantCycles.forEach((c) => {
             sum += c.ad_invest;
        });

        relavantCycles.forEach((c) => {
            let company.stock = company.newStocks.find((s) => s.company.id === c.company.id);
            let company.cycle = newCycles.find((s) => s.company.id === c.company.id);
            company.stock.account_balance += (c.ad_invest / sum) * adPropotion * company.cycle.sales_bid;
        });

    }*/


//TenderSales
    let participatingCompaniesTenderSales = companys.filter((company)=> company.cycle.tender_offer_price > 0)
    let winnerCompany = participatingCompaniesTenderSales.sort((a,b)=> a.cycle.tender_offer_price - b.cycle.tender_offer_price)[0]
    winnerCompany.newStock.finished_sneaker_count -= scenario.tender_offer_count
    winnerCompany.newStock.account_balance += scenario.tender_offer_count * winnerCompany.cycle.tender_offer_price

//AddSales
    let participatingCompaniesAddSales = companys.filter((company)=> company.cycle.ad_invest > 0)
    let sum = participatingCompaniesAddSales.reduce((partialSum, a) => partialSum + a.cycle.ad_invest, 0);
    let raminingSales = scenario.sneaker_ask;
    let adPropotion = raminingSales * 0.10;
    raminingSales - adPropotion
    participatingCompaniesAddSales.map((company)=>{
      let sales = company.cycle.ad_invest / sum  * adPropotion
      if (company.cycle.sales_planned >= sales){
        //TODO make function the else dose the same with other value
        company.newStock.finished_sneaker_count -= sales
        raminingSales -= sales
        company.newStock.account_balance += company.cycle.sales_bid * sales
        company.cycle.sales_planned -= sales
      }else if(company.cycle.sales_planned < sales){
        company.newStock.finished_sneaker_count -= company.cycle.sales_planned
        raminingSales -= company.cycle.sales_planned
        company.newStock.account_balance += company.cycle.sales_bid * company.cycle.sales_planned
        company.cycle.sales_planned = 0
      }

    })

    /*
    while(sales >=0){
           if (company.cycle.sales_planned > 0){
            company.newStock.finished_sneaker_count -= 1
            raminingSales -= 1
            company.newStock.account_balance += company.cycle.sales_bid

           }
           sales -= 1
    }*/


//TODO sales


// after sales
    companys.map((company)=>{
      let machines = [];
      /*machines.push(this.scenarioService.getMachineById(company.stock.machine_1_space));
      machines.push(this.scenarioService.getMachineById(company.stock.machine_2_space));
      machines.push(this.scenarioService.getMachineById(company.stock.machine_3_space));
    */
      machines.push({
        id: 1,
        name:"",
        purchase_cost:12000,
        maintainance_cost: 4000,
        production_cost_per_sneaker:60
      })
      company.newStock.account_balance -= company.newStock.sneaker_count * scenario.storage_fee_sneaker;
      company.newStock.account_balance -= company.newStock.paint_count * scenario.storage_fee_paint;
      company.newStock.account_balance -= company.newStock.finished_sneaker_count * scenario.storage_fee_finished_sneaker;

    })

//TODO company.newStock in die DB

    console.log('companys:', companys)
    console.log('scenario:', scenario);
  }
}