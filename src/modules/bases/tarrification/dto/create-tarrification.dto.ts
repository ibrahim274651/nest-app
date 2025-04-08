import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ConsumptionMode } from 'src/utils/enumerations.enum';

export class CreateTarrificationDto {
  @ApiProperty({
    description: 'Tarrification name',
    example: 'Standard Tarification',
  })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({
    description: 'Consumption mode',
    enum: ConsumptionMode,
    example: ConsumptionMode.SURPLACE,
  })
  @IsNotEmpty()
  @IsString()
  modeConsommation: string;

  @ApiPropertyOptional({
    description: 'Default TVA ID',
    example: '64c7d5a09b0a43a69c983154',
  })
  defaultTva: string;
}
