import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/models/user.entity";
import { GameEntity } from "./game.entity";

@Entity()
export class GameUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GameEntity, (object) => object.id)
  @JoinColumn({ name: 'game_id' })
  game: GameEntity;

  @ManyToOne(() => UserEntity, (object) => object.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}