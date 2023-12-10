import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from "../service/company.service";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../auth/roles/roles.decorator";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CreateCompanyDto } from "../models/dto/CreateCompany.dto";
import { Role } from '../../auth/roles/role.interface';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Get all companies',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCompanies() {
    return await this.companyService.getCompanies();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Get company by id',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCompanyById(@Param('id') id: number) {
    return await this.companyService.getCompanyById(id);
  }

  @Get('game/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Get company by game id',
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCompanyByGameId(@Param('id') id: number, @Req() req) {
    return await this.companyService.getCompanyByGameId(id, req.user.id);
  }

  @Post('create/:gameId')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Create new company',
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createCompany(@Req() req, @Body() createCompanyDto: CreateCompanyDto, @Param('gameId') gameId: number) {
    return await this.companyService.createCompany(req.user.id, createCompanyDto, gameId);
  }

  @Post('join/:companyId')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Join company',
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async joinCompany(@Req() req, @Param('companyId') companyId: number) {
    return await this.companyService.joinCompany(req.user.id, companyId);
  }

  @Delete('leave/:gameId')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Leave company',
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async leaveCompany(@Req() req, @Param('gameId') gameId: number) {
    return await this.companyService.leaveCompany(req.user.id, gameId);
  }
}
