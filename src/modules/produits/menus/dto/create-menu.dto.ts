import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { NiveauxDto } from '../../../../common/level.embedabble';
import { NestedTarificationDto } from 'src/common/tarification.embedabble';
import { NestedCatalogDto } from 'src/common/catalogue.embedabble';

export class CreateMenuDto {
  reference: string;

  @ApiProperty({
    example: 'Petit Déjeuner Deluxe',
    description:
      'The name or designation of the menu item (e.g., breakfast, lunch, or dinner special).',
  })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({
    example: '673367a2c2de36493a2d7d5d',
    description:
      'The ID of the category to which this menu belongs (e.g., Drinks, Appetizers, Main Course).',
  })
  @IsMongoId()
  @IsNotEmpty()
  categorie: string;

  @ApiProperty({
    description: 'Reference to the catalog to which the category belongs.',
    type: NestedCatalogDto,
  })
  @ValidateNested()
  @Type(() => NestedCatalogDto)
  catalogue: NestedCatalogDto;

  @ApiProperty({
    example: true,
    description:
      'Indicates if the menu includes generic items that can be customized (e.g., a build-your-own meal option).',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  articleGeneric: boolean;

  @ApiProperty({
    description:
      'Levels of customization or options available within this menu',
    type: [NiveauxDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NiveauxDto)
  niveaux: NiveauxDto[];

  @ApiPropertyOptional({
    required: true,
    type: [NestedTarificationDto],
    description:
      'Details of the pricing structure for the menu, including variants (e.g., size-based or time-based pricing).',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NestedTarificationDto)
  tarification?: NestedTarificationDto[];

  @ApiProperty({
    example: true,
    description:
      'Indicates whether the menu is visible in the cash register system for quick access by staff.',
    type: 'boolean',
  })
  // @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  visibleCaisse: boolean;

  @ApiPropertyOptional({
    example: 'CODE123456',
    description:
      'Optional barcode for the menu, used for scanning and inventory tracking.',
    required: false,
  })
  @IsOptional()
  codeBarre?: string;

  @ApiPropertyOptional({
    example:
      'A special breakfast menu that includes pancakes, coffee, and juice.',
    description:
      'A short description providing additional details about the menu.',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description:
      'Indicates if the menu is available during Happy Hour (e.g., discounted price periods).',
    type: 'boolean',
  })
  // @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  @IsOptional()
  happyHour?: boolean;
}
