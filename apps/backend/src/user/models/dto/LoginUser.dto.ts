import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  thirtyDaysLogin: boolean;
}