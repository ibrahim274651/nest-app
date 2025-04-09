import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class Niveaux extends Document {
  @Prop({ type: Types.ObjectId, required: false })
  niveauId: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    required: false,
    default: [],
  })
  articleIds: Types.ObjectId[];
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
