import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from '../../company/models/company.entity';

@Entity()
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyEntity, company => company.id)
  @JoinColumn({name: "company_id"})
  company: CompanyEntity;

  @Column()
  current_cycle_index: number;

  @Column()
  sneaker_count: number;

  @Column()
  paint_count: number;

  @Column()
  finished_sneaker_count: number;

  @Column()
  employees_count: number;

  @Column()
  research_budget: number;

  @Column()
  account_balance: number;

  @Column()
  credit_taken: number;

  @Column()
  real_sales: number;

  @Column()
  income_from_sales: number;

  @Column()
  research_production_modifier: number;

  @Column()
  machine_1_space: number;

  @Column()
  machine_2_space: number;

  @Column()
  machine_3_space: number;

  @Column()
  insolvent: boolean;

  @Column()
  tender_sales: number;

  @Column()
  tender_price: number;
}