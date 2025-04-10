import { PartialType } from '@nestjs/mapped-types';
import { CreateCuissonDto } from './create-cuisson.dto';

export class UpdateCuissonDto extends PartialType(CreateCuissonDto) {}
