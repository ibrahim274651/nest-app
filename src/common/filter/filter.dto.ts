import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CategorieType, ConsumptionMode } from 'src/utils/enumerations.enum';

export class FilterStockDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Stock availability to filter.',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  @IsOptional()
  enable: boolean;
}

export class FilterFundDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Fund availability to filter.',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  @IsOptional()
  enable: boolean;
}

export class FilterCategoryDto {
  @ApiPropertyOptional({
    description: 'Category ID to filter.',
    // example: '67335fc1ec8adf440528d8e0',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;
}

export class FilterItemDto {
  @ApiPropertyOptional({
    description: 'Item ID to filter.',
    example: '67b584d0cde58a12568d2bb3',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  readonly itemId?: string;
}

export class FilterStoreDto {
  @ApiPropertyOptional({
    description: 'Store ID to filter.',
    example: '',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  readonly storeId?: string;
}

export class FilterTypeCategoryDto {
  @ApiPropertyOptional({
    description: 'Family type for filtering categories',
    enum: CategorieType,
    required: true,
  })
  @IsEnum(CategorieType)
  @IsOptional()
  typeFamille: string;
}

export class FilterConsumptionModeDto {
  @ApiProperty({
    description: 'Tarification Id',
    type: String,
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  tarificationId?: string;

  @ApiProperty({
    description: 'Consumption type for filtering categories',
    enum: ConsumptionMode,
    required: false,
  })
  @IsEnum(ConsumptionMode)
  @IsOptional()
  mode?: ConsumptionMode;
}

export class FilterForTarificationDto {
  @ApiPropertyOptional({
    description: 'Item ID to filter.',
    example: '67b584d0cde58a12568d2bb3',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  readonly itemId?: string;

  @ApiPropertyOptional({
    description: 'Category ID to filter.',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Stock availability to filter.',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  @IsOptional()
  enable: boolean;

  @ApiProperty({
    description: 'Tarification Id',
    type: String,
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  tarificationId?: string;

  @ApiProperty({
    description: 'Consumption type for filtering categories',
    enum: ConsumptionMode,
    required: false,
  })
  @IsEnum(ConsumptionMode)
  @IsOptional()
  mode?: ConsumptionMode;
}
