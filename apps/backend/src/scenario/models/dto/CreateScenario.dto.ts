import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateScenarioDto {
  @ApiProperty({ description: 'Description of the scenario' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Sneaker price of the scenario' })
  @IsNumber()
  sneaker_price: number;

  @ApiProperty({ description: 'Paint price of the scenario' })
  @IsNumber()
  paint_price: number;

  @ApiProperty({ description: 'Storage fee for sneakers of the scenario' })
  @IsNumber()
  storage_fee_sneaker: number;

  @ApiProperty({ description: 'Storage fee for paint of the scenario' })
  @IsNumber()
  storage_fee_paint: number;

  @ApiProperty({ description: 'Storage fee for finished sneakers of the scenario' })
  @IsNumber()
  storage_fee_finished_sneaker: number;

  @ApiProperty({ description: 'Employee count modifier permanent of the scenario' })
  @IsNumber()
  employee_count_modifier_permanent: number;

  @ApiProperty({ description: 'Factor interest rate of the scenario' })
  @IsNumber()
  factor_interest_rate: number;

  @ApiProperty({ description: 'Employee salary of the scenario' })
  @IsNumber()
  employee_salary: number;

  @ApiProperty({ description: 'Employee signup bonus of the scenario' })
  @IsNumber()
  employee_signup_bonus: number;

  @ApiProperty({ description: 'Employee production capacity of the scenario' })
  @IsNumber()
  employee_production_capacity: number;

  @ApiProperty({ description: 'Employee cost modifier of the scenario' })
  @IsNumber()
  employee_cost_modfier: number;

  @ApiProperty({ description: 'Sneaker ask of the scenario' })
  @IsNumber()
  sneaker_ask: number;

  @ApiProperty({ description: 'Factor ad take of the scenario' })
  @IsNumber()
  factor_ad_take: number;

  @ApiProperty({ description: 'Tender offer count of the scenario' })
  @IsNumber()
  tender_offer_count: number;

  @ApiProperty({ description: 'Employee change allowed of the scenario' })
  @IsBoolean()
  employee_change_allowed: boolean;

  @ApiProperty({ description: 'Machine purchase allowed of the scenario' })
  @IsBoolean()
  machine_purchase_allowed: boolean;

  @ApiProperty({ description: 'Research allowed of the scenario' })
  @IsBoolean()
  research_allowed: boolean;

  @ApiProperty({ description: 'Advertisement allowed of the scenario' })
  @IsBoolean()
  advertisement_allowed: boolean;
}