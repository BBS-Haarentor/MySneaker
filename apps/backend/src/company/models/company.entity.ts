import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GameEntity } from "../../game/models/game.entity";

@Entity()
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => GameEntity, (object) => object.id)
    @JoinColumn({ name: 'game_id' })
    game: GameEntity;
}