import { PartialType } from '@nestjs/swagger';
import { CreateAccompagnementDto } from './create-accompagnement.dto';

export class UpdateAccompagnementDto extends PartialType(
  CreateAccompagnementDto,
) {}
