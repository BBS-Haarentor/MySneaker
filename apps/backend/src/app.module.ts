import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {GameModule} from './game/game.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user/models/user.entity';
import {UserModule} from './user/user.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ScenarioModule} from './scenario/scenario.module';
import {CycleModule} from './cycle/cycle.module';
import {StockModule} from './stock/stock.module';
import {GameEntity} from './game/models/game.entity';
import {GameUserEntity} from './game/models/gameUser.entity';
import {CompanyUserEntity} from './company/models/companyUser.entity';
import {CompanyEntity} from './company/models/company.entity';
import {CompanyModule} from './company/company.module';
import {ScenarioEntity} from "./scenario/models/scenario.entity";
import {CycleEntity} from "./cycle/models/cycle.entity";
import {StockEntity} from "./stock/models/stock.entity";
import {MachineEntity} from './scenario/models/machine.entity';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USER'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                entities: [
                    UserEntity,
                    GameEntity,
                    GameUserEntity,
                    CompanyUserEntity,
                    CompanyEntity,
                    ScenarioEntity,
                    CycleEntity,
                    StockEntity,
                    MachineEntity,
                ],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        UserModule,
        GameModule,
        ScenarioModule,
        CycleModule,
        StockModule,
        CompanyModule,
    ],
    controllers: [AppController],
})

export class AppModule {
}
