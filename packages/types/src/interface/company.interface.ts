import { IGame } from './game.interface';

export interface ICompany {
  id: number;
  name: string;
  game: IGame;
}