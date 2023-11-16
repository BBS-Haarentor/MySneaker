import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { GameService } from '../service/game.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateGameDto } from '../models/dto/CreateGame.dto';
import { Roles } from '../../auth/roles/roles.decorator';
import { Role } from '../../auth/roles/role.enum';
import { RolesGuard } from "../../auth/guards/roles.guard";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { IGame } from "../models/game.interface";
import { UpdateGameDto } from "../models/dto/UpdateGame.dto";

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('create')
  @ApiBearerAuth()
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createNewGame(@Body() body: CreateGameDto, @Req() req) {
    return await this.gameService.createNewGame(body, req.user.id);
  }

  @Post('add/:gameId/:userId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Add user to game' })
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addUserToGame(@Param('gameId') gameId: number, @Param('userId') userId: number) {
    return await this.gameService.addUserToGame(gameId, userId);
  }


  @Put()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Update game' })
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateGame(@Body() body: UpdateGameDto, @Req() req) {
    return await this.gameService.updateGame(body, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all games', type: [IGame], isArray: true })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllGames() {
    return await this.gameService.getAllGames();
  }

  @Get('my')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all games for User' })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllGamesForUser(@Req() req) {
    return await this.gameService.getAllGamesForUser(req.user.id);
  }

  @Delete(':gameId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Delete game' })
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteGame(@Req() req, @Param('gameId') gameId: number) {
    return await this.gameService.deleteGame(gameId, req.user.id);
  }
}
