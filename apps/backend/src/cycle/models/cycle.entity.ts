import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyEntity } from "../../company/models/company.entity";

@Entity()
export class CycleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  current_cycle_index: number;

  @OneToMany(() => CompanyEntity, company => company.id)
  @JoinColumn({name: "company_id"})
  company: CompanyEntity;

  @Column()
  buy_sneaker: number;

  @Column()
  buy_paint: number;

  @Column()
  planned_production_1: number;

  @Column()
  planned_production_2: number;

  @Column()
  planned_production_3: number;

  @Column()
  planned_workers_1: number;

  @Column()
  planned_workers_2: number;

  @Column()
  planned_workers_3: number;

  @Column()
  include_from_stock: number;

  @Column()
  sales_planned: number;

  @Column()
  sales_bid: number;

  @Column()
  tender_offer_price: number;

  @Column()
  research_invest: number;

  @Column()
  ad_invest: number;

  @Column()
  take_credit: number;

  @Column()
  payback_credit: number;

  @Column()
  new_employees: number;

  @Column()
  let_go_employees: number;

  @Column()
  buy_new_machine: number;
}