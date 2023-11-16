import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;
}