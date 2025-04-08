import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsBoolean } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Article } from 'src/modules/produits/articles/entities/article.entity';

@Schema({ _id: false })
export class NestedArticle extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Article.name,
    required: false,
  })
  articleId: Article;

  @Prop({ required: true, type: Boolean, default: false })
  achat: boolean;

  @Prop({ required: true, type: Boolean, default: false })
  offert: boolean;
}

export const NestedArticleSchema = SchemaFactory.createForClass(NestedArticle);

// DTO
export class NestedArticleDto {
  @ApiProperty({
    example: '676eada9b8a048067de18b71',
    description: 'List of article IDs to which the promotion is applied.',
    required: true,
  })
  @IsMongoId()
  articleId: string;

  @ApiProperty({
    description: 'Indicates if the item is available for purchase.',
    example: false,
  })
  @IsBoolean()
  achat: boolean;

  @ApiProperty({
    description: 'Indicates if the item is part of a special offer.',
    example: false,
  })
  @IsBoolean()
  offert: boolean;
}
