import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateTvaDto {
  @ApiProperty({
    description: 'Designation of the TVA',
    example: 'TVA Normale',
  })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({ description: 'TVA rate (e.g., 18 for 18%)', example: 18 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  taux: number;

  @ApiProperty({ description: 'Sales accounting account', example: '411100' })
  @IsOptional()
  @IsString()
  compte_comptable_vente: string;

  @ApiProperty({
    description: 'Collection accounting account',
    example: '445710',
  })
  @IsOptional()
  @IsString()
  compte_comptable_collecte: string;
}
