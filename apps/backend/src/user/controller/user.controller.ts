import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserService } from '../service/user.service';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from '../../auth/roles/role.interface';
import { IUser } from '../models/user.interface';
import { IUserValidation } from '../models/userValidation.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Rest Call: POST http://localhost:8080/api/users/
  @Post()
  @HttpCode(201)
  async create(@Body() createdUserDto: CreateUserDto) {
    return await this.userService.create(createdUserDto);
  }

  // Rest Call: POST http://localhost:8080/api/users/login
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async deleteUser(@Req() req, @Param('userId') userId: number) {
    if (req.user.id == userId)
      throw new HttpException(
        "You can't delete your self",
        HttpStatus.BAD_REQUEST,
      );
    return await this.userService.deleteUser(userId);
  }

  @ApiParam({name: 'userId', type: String, required: true})
  @ApiParam({name: 'role', enum: Role, required: true})
  @ApiBearerAuth()
  @Post(':userId/switchRoleTo/:role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async editRole(@Req() req, @Param('userId') userId: number, @Param('role') role: Role) {
    if (req.user.id == userId)
      throw new HttpException(
        "You can't delete your self",
        HttpStatus.BAD_REQUEST,
      );
    return await this.userService.editRole(userId, role);
  }

  @ApiBearerAuth()
  @ApiParam({name: 'userId', type: String, required: true})
  @Post('active/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async activeUser(@Param('userId') userId) {
    return await this.userService.activeUser(userId);
  }

  @ApiBearerAuth()
  @Get('validation')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async validationJWT(@Req() req): Promise<IUserValidation> {
    const userDatabase = await this.userService
      .findOneRepository(req.user.id)
      .then((value) => value);
    if (userDatabase === null)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return {
      user: userDatabase,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }
}
