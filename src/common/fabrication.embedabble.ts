import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsMongoId, IsNumber } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class NestedFabrication extends Document {
  @Prop({ type: Types.ObjectId, required: false })
  fabricationId: Types.ObjectId;

  @Prop({ required: false, type: Number, default: 0 })
  quantite: number;

  @Prop({ required: false, type: Number, default: 0 })
  part: number;

  @Prop({ required: false, type: Boolean, default: false })
  stockProduitArticle: boolean;
}

export const NestedFabricationSchema =
  SchemaFactory.createForClass(NestedFabrication);

// DTO
export class FabricationNestedDto {
  @ApiProperty({
    example: '6756e3005fa2a7a9c5b41cf2',
    description: 'Fabrication ID',
    required: false,
    type: 'string',
  })
  @IsMongoId()
  fabricationId: string;

  @ApiProperty({ example: 0.1, description: 'Quantity', type: 'number' })
  @IsNumber()
  @Type(() => Number)
  quantite: number;

  @ApiProperty({ example: 20, description: 'Part', type: 'number' })
  @IsNumber()
  @Type(() => Number)
  part: number;

  @ApiProperty({
    example: true,
    description: 'Stock availability',
    type: 'boolean',
  })
  @Transform(({ value }) => value === true || value === 'true')
  stockProduitArticle: boolean;
}
