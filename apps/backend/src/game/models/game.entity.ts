import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ScenarioEntity } from "../../scenario/models/scenario.entity";
import { UserEntity } from "../../user/models/user.entity";

@Entity()
export class GameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /*
        0 - not started
        1 - started
        2 - finished
     */
    @Column({
        default: 0
    })
    status: number;

    @ManyToMany(() => ScenarioEntity, scenario => scenario.games, {
        cascade: true,
    })
    @JoinTable()
    scenarios: ScenarioEntity[];

    @Column()
    description: string;

    @OneToMany(() => UserEntity, user => user.id)
    @JoinColumn({name: "user_id"})
    teacher: UserEntity;

    @Column({
        default: 0
    })
    cycle_index: number;
}