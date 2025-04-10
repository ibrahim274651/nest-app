import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { NestedCatalogDto } from 'src/common/catalogue.embedabble';
import { FabricationNestedDto } from 'src/common/fabrication.embedabble';
import { NestedTarificationDto } from 'src/common/tarification.embedabble';

export class NestedUniteDto {
  @ApiPropertyOptional({
    example: '67336142ec8adf440528d8fb',
    description: 'Unit ID for the article',
  })
  // @IsMongoId()
  @IsOptional()
  unite: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'List of accompaniments',
    type: Number,
  })
  @IsOptional()
  cond: number;

  // @ApiPropertyOptional({
  //   example: 0.4,
  //   description: 'List of accompaniments',
  //   type: Number,
  // })
  // @IsOptional()
  // prixCond: number;
}

export class CreateArticleDto {
  reference: string;

  @ApiProperty({
    example: 'Pizza Margherita',
    description: 'Designation of the article',
  })
  @IsString()
  designation: string;

  @ApiProperty({
    example: '67336142ec8adf440528d8fb',
    description: 'Category ID for the article',
  })
  @IsMongoId()
  @Transform(({ value }) => value?.toString())
  categorie: string;

  @ApiProperty({ example: 5, description: 'Minimum threshold', type: 'number' })
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseFloat(value))
  seuilMinimum: number;

  @ApiPropertyOptional({
    example: 'XVADGSFRGFHG1Q',
    description: 'Unique codeBarre for the article',
    required: false,
  })
  codeBarre: string;

  @ApiProperty({
    description: 'Reference to the catalog to which the category belongs.',
    type: NestedCatalogDto,
  })
  @ValidateNested()
  @Type(() => NestedCatalogDto)
  catalogue: NestedCatalogDto;

  @ApiProperty({
    required: true,
    type: [NestedTarificationDto],
    description: 'Details of the tarification',
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NestedTarificationDto)
  tarification: NestedTarificationDto[];

  @ApiProperty({
    example: true,
    description: 'Stock availability',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  gererStockProduit: boolean;

  @ApiProperty({
    example: true,
    description: 'Cuisson availability',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  cuisson: boolean;

  @ApiProperty({
    example: true,
    description: 'Caisse availability',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  visibleCaisse: boolean;

  @ApiProperty({
    example: ['67b735ed1193bc5b6b5c97eb'],
    description: 'List of accompaniments',
    required: false,
  })
  @IsArray()
  // @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @IsOptional()
  accompagnement?: string[];

  @ApiPropertyOptional({
    required: false,
    type: [FabricationNestedDto],
    description: 'Details of the fabrication (optional)',
  })
  @IsOptional()
  @IsArray({ message: 'fabrication must be an array if provided' })
  @ValidateNested()
  @Type(() => FabricationNestedDto)
  fabrication?: FabricationNestedDto[];

  @ApiProperty({
    example: true,
    description: 'Stock availability',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  articleGeneric: boolean;

  @ApiPropertyOptional({ type: () => NestedUniteDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => NestedUniteDto)
  uniteDetails?: NestedUniteDto;

  @ApiPropertyOptional({
    example: 10500,
    description: 'Buying price excluding taxes (HT) . Optional field.',
    type: 'number',
  })
  @IsOptional()
  @IsNumber({}, { message: 'The paHT must be a valid number if provided' })
  @Type(() => Number)
  @Transform(({ value }) =>
    value !== null && value !== undefined ? parseFloat(value) : value,
  )
  paHT?: number;

  // @ApiPropertyOptional({
  //   example: 11500,
  //   description: 'Weighted Average Unit Cost (C.U.M.P) . Optional field.',
  //   type: 'number',
  // })
  // @IsOptional()
  // @IsNumber({}, { message: 'The cump must be a valid number if provided' })
  // @Type(() => Number)
  // @Transform(({ value }) =>
  //   value !== null && value !== undefined ? parseFloat(value) : value,
  // )
  // cump?: number;
}
