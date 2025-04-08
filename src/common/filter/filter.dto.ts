import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import {
  MouvementType,
  OtherType,
  CategorieType,
  GlobalStatus,
  ConsumptionMode,
} from '@/utils/enumerations.enum';

export class FilterStockDto {
  @ApiPropertyOptional({
    // example: '',
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
    // example: '',
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

export class FilterMovementDto {
  @ApiPropertyOptional({
    // example: MouvementType.ENTREE,
    description: 'Movement type for filtering mouvement',
    enum: MouvementType,
  })
  @IsOptional()
  @IsEnum(MouvementType)
  typeMouvement: string;
}

export class FilterOperationDto {
  @ApiPropertyOptional({
    // example: OtherType.TRANSFERT_ENTRANT,
    description: 'Operation type for filtering mouvement',
    enum: OtherType,
    required: true,
  })
  @IsEnum(OtherType)
  @IsOptional()
  typeOperation?: string;
}

export class FilterTypeCategoryDto {
  @ApiPropertyOptional({
    // example: CategorieType.ARTICLE,
    description: 'Family type for filtering categories',
    enum: CategorieType,
    required: true,
  })
  @IsEnum(CategorieType)
  @IsOptional()
  typeFamille: string;
}

export class FilterGlobalStatusDto {
  @ApiPropertyOptional({
    // example: GlobalStatus.EN_ATTENTE,
    description: 'Transfer status type for filtering',
    enum: GlobalStatus,
    required: false,
  })
  @IsEnum(GlobalStatus)
  @IsOptional()
  status?: GlobalStatus;
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

  @ApiPropertyOptional({
    description: 'Store ID to filter.',
    example: '',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  readonly storeId?: string;
}

export class FilterForItemDto {
  @ApiPropertyOptional({
    description: 'Item ID to filter.',
    example: '67b58c1941b40fce236d0828',
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

  @ApiPropertyOptional({
    required: false,
    description: 'Cashier availability to filter.',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  @IsOptional()
  visible: boolean;

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

  @ApiPropertyOptional({
    description: 'Store ID to filter.',
    example: '',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  readonly storeId?: string;
}
