import { PartialType } from '@nestjs/swagger';
import { CreateFabricationDto } from './create-fabrication.dto';

export class UpdateFabricationDto extends PartialType(CreateFabricationDto) {}
