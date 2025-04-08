import { CreateArticleDto } from './create-article.dto';
import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsMongoId, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindArticlesDto {
  @ApiPropertyOptional({
    description:
      'Texte pour rechercher dans les champs "designation" et "reference".',
    example: 'article',
    type: String,
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiPropertyOptional({
    description: 'ID de la catégorie pour filtrer les articles.',
    example: '64c2f09b2d5b9a001f4a5b12',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Nombre d’articles par page (pagination).',
    example: 10,
    type: Number,
    minimum: 1,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({
    description: 'Numéro de page (pagination).',
    example: 1,
    type: Number,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
