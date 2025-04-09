import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsBoolean } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class NestedArticle extends Document {
  @Prop({ type: Types.ObjectId, required: false })
  articleId: Types.ObjectId;

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
