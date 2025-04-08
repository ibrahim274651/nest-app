import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatalogueDto {
  @ApiProperty({
    type: 'string',
    example: 'Pizza Margherita',
    description: 'Designation of the catalog',
  })
  @IsString()
  designation: string;

  @ApiPropertyOptional({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of uploaded image paths',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  images: string[];
}

export class OtherImageDto {
  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of uploaded image paths',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  images: string[];
}

export class DeleteImageDto {
  @ApiProperty({
    example: 'image1.jpg',
    description: 'The name of the image to remove from the catalogue',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
