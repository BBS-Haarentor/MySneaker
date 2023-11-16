import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { GameEntity } from "../../game/models/game.entity";

@Entity()
export class ScenarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => GameEntity, game => game.scenarios)
  games: GameEntity[];

  @Column()
  description: string;

  @Column({
    type: 'float'
  })
  sneaker_price: number;

  @Column({
    type: 'float'
  })
  paint_price: number;

  @Column({
    type: 'float'
  })
  storage_fee_sneaker: number;

  @Column({
    type: 'float'
  })
  storage_fee_paint: number;

  @Column({
    type: 'float'
  })
  storage_fee_finished_sneaker: number;

  @Column({
    type: 'float'
  })
  employee_count_modifier_permanent: number;

  @Column({
    type: 'float'
  })
  factor_interest_rate: number;

  @Column({
    type: 'float'
  })
  employee_salary: number;

  @Column({
    type: 'float'
  })
  employee_signup_bonus: number;

  @Column({
    type: 'float'
  })
  employee_production_capacity: number;

  @Column({
    type: 'float'
  })
  employee_cost_modfier: number;

  @Column({
    type: 'float'
  })
  sneaker_ask: number;

  @Column({
    type: 'float'
  })
  factor_ad_take: number;

  @Column({
    type: 'float'
  })
  tender_offer_count: number;

  @Column()
  employee_change_allowed: boolean;

  @Column()
  machine_purchase_allowed: boolean;

  @Column()
  research_allowed: boolean;

  @Column()
  advertisement_allowed: boolean;
}