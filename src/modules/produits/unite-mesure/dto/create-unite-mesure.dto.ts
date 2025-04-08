import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUniteMesureDto {
  @ApiProperty({
    description:
      "Nom de l'unité de mesure utilisée dans le menu ou les recettes",
    example: 'Litre',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({
    description: "Symbole de l'unité de mesure",
    example: 'L',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  symbole: string;
}
