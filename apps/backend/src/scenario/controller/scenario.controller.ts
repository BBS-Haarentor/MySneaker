import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ScenarioService } from '../service/scenario.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/roles/roles.decorator';
import { Role } from '../../auth/roles/role.enum';
import { RolesGuard } from "../../auth/guards/roles.guard";
import { CreateScenarioDto } from "../models/dto/CreateScenario.dto";

@ApiTags('scenario')
@Controller('scenario')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 201,
    description: 'Create new scenario',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createScenario(@Body() scenario: CreateScenarioDto) {
    return await this.scenarioService.createScenario(scenario);
  }

  @Post('seed')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 201,
    description: 'Seed default scenario',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async seedDefaultScenario() {
    return await this.scenarioService.seedDefaultScenario();
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Get all scenarios',
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getScenarios() {
    return await this.scenarioService.getScenarios();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Get scenario by id',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getScenarioById(@Param('id') id: number) {
    return await this.scenarioService.getScenarioById(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Delete scenario by id',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteScenarioById(@Param('id') id: number) {
    return await this.scenarioService.deleteScenarioById(id);
  }
}
