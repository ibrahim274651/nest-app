import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CategorieType } from 'src/utils/enumerations.enum';
import { Type } from 'class-transformer';
import { NestedCatalogDto } from 'src/common/catalogue.embedabble';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Cocktails',
    description: 'The label of the category.',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'designation is required' })
  designation: string;

  @ApiProperty({
    description: 'Reference to the catalog to which the category belongs.',
    type: NestedCatalogDto,
  })
  @ValidateNested()
  @Type(() => NestedCatalogDto)
  catalogue: NestedCatalogDto;

  // @ApiProperty({
  //   example: 10,
  //   description: 'The maximum number of items allowed in this category.',
  // })
  // @IsNumber()
  // nombreMax: number;

  // @ApiProperty({
  //   example: 5,
  //   description: 'The number of mandatory items in this category.',
  // })
  // @IsNumber()
  // nombreObligatoire: number;

  @ApiProperty({
    example: true,
    description: 'Indicates whether stock is available for this category.',
  })
  @IsBoolean()
  stock: boolean;

  @ApiProperty({
    example: CategorieType.ARTICLE,
    description:
      'The type of category. Possible values are: "article" (standard item), "accompaniment" (side dish).',
    enum: CategorieType,
  })
  @IsEnum(CategorieType)
  typeFamille: string;

  @ApiProperty({
    description:
      'List of identifiers for the pricing structure of this category.',
    type: [String],
    example: ['674a2cfa56ec9a24f3c4d901', '674b0e9f88d24f37c4b3a501'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  tarification: string[];
}
