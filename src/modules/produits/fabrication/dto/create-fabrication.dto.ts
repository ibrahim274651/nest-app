import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { FabricationType } from 'src/utils/enumerations.enum';

export class CreateFabricationDto {
  @ApiProperty({
    description: 'Name or designation of the fabrication item.',
    example: 'Sugar',
  })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({
    description:
      'Type of fabrication item. Must be one of the predefined types.',
    example: FabricationType.FABRICATION,
    enum: FabricationType,
  })
  @IsNotEmpty()
  @IsEnum(FabricationType)
  type: FabricationType;

  @ApiProperty({
    description: 'Indicates whether the item is currently in stock.',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  stock: boolean;

  @ApiProperty({
    description: 'Minimum stock level required to avoid restocking alerts.',
    example: 0,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stockMin: number;
}
