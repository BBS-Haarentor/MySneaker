import { IScenario } from './scenario.interface';
import { ICycle } from './cycle.interface';
import { IStock } from './stock.interface';

export interface IGameData {
  scenario?: IScenario;
  cycle?: ICycle;
  stock?: IStock;
}