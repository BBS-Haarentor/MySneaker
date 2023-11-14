import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user.interface';
import { Role } from '../../auth/roles/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async create(createdUserDto: CreateUserDto): Promise<any> {
    const userEntity = this.userRepository.create(createdUserDto);
    const users = await this.findAll();

    if(users.length === 0) {
      userEntity.status = '1';
      userEntity.role = [Role.ADMIN];
    }

    await this.userRepository.save(userEntity);

    return {
      message: 'User created',
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.findUserByUsername(loginUserDto.username);
    if(!user)
      throw new HttpException(
        'login.emailOrPasswordIncorrect',
        HttpStatus.NOT_FOUND,
      );
    if (user.status === '0')
      throw new HttpException(
        'login.userEmailVerify',
        HttpStatus.BAD_REQUEST,
      );
    if (user.status === '2')
      throw new HttpException('User is deactivate', HttpStatus.CONFLICT);

    const passwordsMatches = this.validatePassword(
      loginUserDto.password,
      user.password,
    );

    if (passwordsMatches) {
      const userEntity = await this.findOne(user.id);
      return await this.authService.generateJwt(
        user,
        loginUserDto.thirtyDaysLogin !== null &&
        loginUserDto.thirtyDaysLogin
          ? '30d'
          : '1d',
      );
    } else {
      throw new HttpException(
        'login.emailOrPasswordIncorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<IUser> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  findOneRepository(userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  private async findUserByUsername(username: string): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { username: username },
      select: ['id', 'username', 'status', 'password'],
    });
  }

  private async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return await this.authService.comparePasswords(password, storedPasswordHash);
  }

  async deleteUser(userId: number) {
    return this.userRepository
      .delete({ id: userId })
      .catch(() => {
        throw new HttpException('', HttpStatus.BAD_REQUEST);
      })
      .then(() => {
        return {
          message: 'User delete success',
        };
      });
  }

  async activeUser(userId: number) {
    const user = await this.findOneRepository(userId);
    user.status = '1';
    return this.userRepository
      .save(user)
      .then(() => {
        return {
          message: 'User is now active',
        };
      })
      .catch(() => {
        throw new HttpException(
          'User could not be activated',
          HttpStatus.CONFLICT,
        );
      });
  }

  async editRole(userId: number, role: string) {
    const user = await this.findOneRepository(userId);
    const typedRoleString = role as keyof typeof Role;
    user.role = [Role[typedRoleString]];
    return this.userRepository
      .save(user)
      .then(() => {
        return {
          message: 'User role updated',
        };
      })
      .catch(() => {
        throw new HttpException(
          'Role of the user could not be updated',
          HttpStatus.CONFLICT,
        );
      });
  }
}
