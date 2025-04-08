import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  ValidateNested,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { NestedCatalogDto } from 'src/common/catalogue.embedabble';
import { FabricationNestedDto } from 'src/common/fabrication.embedabble';
import { NestedTarificationDto } from 'src/common/tarification.embedabble';

export class CreateAccompagnementDto {
  reference: string;

  @ApiProperty({
    example: 'Extra Cheese',
    description:
      'The name or designation of the accompaniment (e.g., extra toppings, sides, or sauces).',
  })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({
    example: '6733628eec8adf440528d90a',
    description:
      'The ID of the category to which this accompaniment belongs (e.g., Toppings, Sauces, Sides).',
  })
  @IsMongoId()
  // @Transform(({ value }) => value?.toString())
  categorie: string;

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
    description:
      'Pricing details for the accompaniment, including variants (e.g., size-based pricing or time-specific discounts).',
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NestedTarificationDto)
  tarification: NestedTarificationDto[];

  @ApiPropertyOptional({
    example: true,
    description:
      'Indicates whether stock management is enabled for this accompaniment (e.g., to track inventory levels).',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  gererStockProduit: boolean;

  @ApiPropertyOptional({
    example: 10,
    description:
      'The minimum stock level for this accompaniment before it triggers a restock alert.',
    type: 'number',
  })
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseFloat(value))
  stockMini: number;

  @ApiPropertyOptional({
    required: false,
    type: [FabricationNestedDto],
    description:
      'Details of any fabrication or preparation steps required for the accompaniment (e.g., pre-mixed sauces).',
  })
  @IsOptional()
  @IsArray({ message: 'fabrication must be an array if provided' })
  @ValidateNested({ each: true })
  @Type(() => FabricationNestedDto)
  fabrication?: FabricationNestedDto[];

  @ApiPropertyOptional({
    example: true,
    description:
      'Indicates whether the accompaniment is visible on the POS system for easy access by staff.',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  visibleCaisse: boolean;

  @ApiPropertyOptional({
    example: true,
    description:
      'Indicates whether the accompaniment is a generic customizable item (e.g., a topping that can be adjusted by the customer).',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  accompGeneric: boolean;

  @ApiPropertyOptional({
    example: 'Cheddar cheese, suitable for vegetarians.',
    description:
      'A brief description of the accompaniment, including key details (e.g., dietary information or special characteristics).',
    required: false,
  })
  description: string;
}
