import { IsNumber, IsString } from 'class-validator';

export class CreateMachineDto {
  @IsString()
  name: string;

  @IsNumber()
  purchase_cost: number;

  @IsNumber()
  maintainance_cost: number;

  @IsNumber()
  production_cost_per_sneaker: number;
}