import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MachineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  purchase_cost: number;

  @Column()
  maintainance_cost: number;

  @Column()
  production_cost_per_sneaker: number;
}