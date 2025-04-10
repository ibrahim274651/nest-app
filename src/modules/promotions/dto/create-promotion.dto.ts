import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { NestedArticleDto } from 'src/common/article.embedabble';

export class CreatePromotionDto {
  @ApiProperty({ example: 'Happy Hour', required: true })
  @IsString()
  designation: string;

  @ApiProperty({
    example: 10,
    description:
      'The quantity of the item on promotion (for example, 50% discount).',
    required: true,
  })
  @IsNumber()
  quantite: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Base bonus per quantity of the item on promotion.',
    required: true,
  })
  @IsNumber()
  bonus: number;

  @ApiPropertyOptional({
    required: false,
    example: new Date().toISOString(),
  })
  @IsDateString()
  dateDebut: Date;

  @ApiPropertyOptional({
    required: false,
    example: new Date().toISOString(),
  })
  @IsDateString()
  dateFin: Date;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the promotion is unlimited in time.',
    required: false,
  })
  @IsBoolean()
  periodeIllimite: boolean;

  @ApiProperty({
    description: 'Items',
    type: [NestedArticleDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestedArticleDto)
  articles: NestedArticleDto[];
}
