import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";
import { UserEntity } from "../../user/models/user.entity";

@Entity()
export class CompanyUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyEntity, (object) => object.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (object) => object.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}