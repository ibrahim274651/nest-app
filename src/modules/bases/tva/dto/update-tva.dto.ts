import { PartialType } from '@nestjs/swagger';
import { CreateTvaDto } from './create-tva.dto';

export class UpdateTvaDto extends PartialType(CreateTvaDto) {}
