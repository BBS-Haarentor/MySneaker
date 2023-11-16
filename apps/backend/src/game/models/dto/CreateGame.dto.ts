import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGameDto {
  @ApiProperty({ description: 'Name of the game' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the game' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Scenarios of the game' })
  @IsArray()
  scenarios: string[];
}