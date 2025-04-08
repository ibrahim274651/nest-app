import { PartialType } from '@nestjs/swagger';
import { CreateTarrificationDto } from './create-tarrification.dto';

export class UpdateTarrificationDto extends PartialType(
  CreateTarrificationDto,
) {}
