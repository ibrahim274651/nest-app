import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Article } from '@/modules/produits/articles/entities/article.entity';
import { MenuStage } from '@/modules/produits/menu-stage/entities/menu-stage.entity';

@Schema({ _id: false })
export class Niveaux extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MenuStage.name,
    required: false,
  })
  niveauId: MenuStage;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: Article.name,
    default: [],
  })
  articleIds: Article[];
}

export const NiveauxSchema = SchemaFactory.createForClass(Niveaux);

// DTO
export class NiveauxDto {
  @ApiProperty({
    example: '676536e24608ef44cafdb11d',
    description: 'Menu stage ID (must be a valid ObjectId)',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  niveauId?: string;

  @ApiProperty({
    example: ['67b5b26ea0722cd57ecef5e4', '67b584d0cde58a12568d2bb3'],
    type: 'array',
    items: {
      type: 'string',
      description: 'Article ID (must be valid ObjectId)',
    },
    description: 'Array of article IDs (optional)',
  })
  @IsMongoId({ each: true })
  @IsOptional()
  articleIds?: string[];
}
