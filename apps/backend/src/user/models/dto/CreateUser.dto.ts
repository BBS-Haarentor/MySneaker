import { IsString } from 'class-validator';
import { LoginUserDto } from './LoginUser.dto';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto extends LoginUserDto {
  @ApiProperty()
  @IsString()
  username: string;
}
