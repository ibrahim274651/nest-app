import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuStageDto {
  @ApiProperty({
    example: 'Niveau 1',
    description: 'Name of the level.',
  })
  @IsString()
  @IsNotEmpty()
  designation: string;
}
