import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './models/company.entity';
import { CompanyUserEntity } from './models/companyUser.entity';
import { CompanyController } from './controller/company.controller';
import { UserModule } from '../user/user.module';
import { GameModule } from "../game/game.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, CompanyUserEntity]),
    UserModule,
    GameModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
