import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user/models/user.entity";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ScenarioModule } from './scenario/scenario.module';
import { CycleModule } from './cycle/cycle.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "mysneaker",
      password: "password",
      database: 'foo',
      entities: [UserEntity],
      synchronize: true,
    }),
    UserModule,
    GameModule,
    ScenarioModule,
    CycleModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
