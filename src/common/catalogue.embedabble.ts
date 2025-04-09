import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class NestedCatalog extends Document {
  @Prop({ type: Types.ObjectId, required: false })
  declare id: Types.ObjectId;

  @Prop({ required: true, type: String, default: '' })
  image: string;
}

export const NestedCatalogSchema = SchemaFactory.createForClass(NestedCatalog);

// DTO
export class NestedCatalogDto {
  @ApiProperty({
    example: '6801a328b9b33e8b5c12345f',
    description: 'ID of the catalogue item',
    required: true,
  })
  @IsMongoId()
  id: string;

  @ApiProperty({
    description: 'Image URL of the catalogue item',
    example: 'image_1.png',
  })
  @IsString()
  image: string;
}
