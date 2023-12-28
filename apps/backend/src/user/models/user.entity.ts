import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from "bcrypt";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Role } from '../../auth/roles/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 0 })
  status: string;

  @Column({ type: 'enum', enum: Role, default: [Role.USER], array: true })
  role: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  usernameLength() {
    if (this.username.length < 4) {
      throw new HttpException('Username is too short', HttpStatus.BAD_REQUEST);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashedPassword() {
    this.password = await hash(this.password, 12);
  }
}
