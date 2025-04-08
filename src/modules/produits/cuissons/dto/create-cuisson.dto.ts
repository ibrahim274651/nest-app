import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { NestedCatalogDto } from 'src/common/catalogue.embedabble';

export class CreateCuissonDto {
  @ApiProperty({
    description: 'Reference to the catalog to which the category belongs.',
    type: NestedCatalogDto,
  })
  @ValidateNested()
  @Type(() => NestedCatalogDto)
  catalogue: NestedCatalogDto;

  @ApiProperty({
    example: 'Cuisson sous vide ',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  designation: string;
}
