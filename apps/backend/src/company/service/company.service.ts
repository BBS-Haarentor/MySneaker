import { HttpException, Injectable } from '@nestjs/common';
import { CompanyEntity } from '../models/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyUserEntity } from '../models/companyUser.entity';
import { UserService } from '../../user/service/user.service';
import { GameService } from '../../game/service/game.service';
import { CreateCompanyDto } from '../models/dto/CreateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CompanyUserEntity)
    private companyUserRepository: Repository<CompanyUserEntity>,
    private readonly userService: UserService,
    private readonly gameService: GameService,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    return this.companyRepository.find({
      relations: ['game'],
    });
  }

  async findOne(id: number): Promise<CompanyEntity> {
    return this.companyRepository.findOne({
      where: { id },
      relations: ['game'],
    });
  }

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    return this.companyRepository.save(company);
  }

  async update(company: CompanyEntity): Promise<CompanyEntity> {
    return this.companyRepository.save(company);
  }

  async delete(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async addUser(companyUser: CompanyUserEntity): Promise<CompanyUserEntity> {
    return this.companyUserRepository.save(companyUser);
  }

  async removeUser(companyUser: CompanyUserEntity): Promise<void> {
    await this.companyUserRepository.delete({
      company: { id: companyUser.company.id },
      user: { id: companyUser.user.id },
    });
  }

  async findUsers(companyId: number): Promise<CompanyUserEntity[]> {
    return this.companyUserRepository.find({
      where: { company: { id: companyId } },
      relations: ['user'],
    });
  }

  async getCompanies() {
    return await this.companyRepository.find({
      relations: ['game'],
    });
  }

  async getCompanyById(id: number) {
    const company = await this.companyRepository.findOne({
      where: {
        id,
      },
      relations: ['game'],
    });
    if (!company) {
      throw new HttpException('Company not found', 404);
    }
    return company;
  }

  async getCompanyByGameId(gameId: number, userId: number) {
    return await this.companyRepository.find({
      where: {
        game: { id: gameId },
      },
      relations: ['game'],
    });
  }

  async createCompany(
    userId: number,
    createCompanyDto: CreateCompanyDto,
    gameId: number,
  ) {
    if (await this.gameService.checkIfIsUserInGame(gameId, userId))
      throw new HttpException('User is not in game', 403);
    const game = await this.gameService.getGameById(gameId);
    if(!game) throw new HttpException('Game not found', 404);
    if(await this.checkIfIsUserInCompany(userId, gameId))
      throw new HttpException('User is already in company', 403);
    const company = this.companyRepository.create({
      name: createCompanyDto.name,
      game: { id: game.id },
    });
    await this.companyRepository.save(company);
    const user = await this.userService.findOne(userId);
    const companyUser = this.companyUserRepository.create({
      user: user,
      company: company,
    });
    await this.companyUserRepository.save(companyUser);
    return {
      message: 'Company created',
    };
  }

  async joinCompany(userId: number, companyId: number) {
    const company = await this.companyRepository.findOne({
      where: {
        id: companyId,
      },
      relations: ['game'],
    });
    if (!company) throw new HttpException('Company not found', 404);
    if (await this.gameService.checkIfIsUserInGame(company.game.id, userId))
      throw new HttpException('User is not in game', 403);
    if(await this.checkIfIsUserInCompany(userId, company.game.id))
      throw new HttpException('User is already in company', 403);
    const user = await this.userService.findOne(userId);
    const companyUser = this.companyUserRepository.create({
      user: user,
      company: company,
    });
    await this.companyUserRepository.save(companyUser);
    return {
      message: 'Company joined',
    };
  }

  async leaveCompany(userId: number, gameId: number) {
    if(!await this.checkIfIsUserInCompany(userId, gameId))
      throw new HttpException('User is not in company', 403);
    const userEntity = await this.companyUserRepository.findOne({
      where: {
        user: { id: userId },
        company: { game: { id: gameId } },
      },
      relations: ['user', 'company', 'company.game'],
    })
    await this.companyUserRepository.delete({
      user: { id: userId },
      company: { id: userEntity.company.id },
    });
    return {
      message: 'Company left',
    };
  }

  async checkIfIsUserInCompany(userId: number, gameId: number) {
    const userEntities = await this.companyUserRepository.findOne({
      where: {
        user: { id: userId },
        company: { game: { id: gameId } },
      },
      relations: ['user', 'company', 'company.game'],
    });
    return userEntities !== null;
  }
}
