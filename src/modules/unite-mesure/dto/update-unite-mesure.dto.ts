import { PartialType } from '@nestjs/mapped-types';
import { CreateUniteMesureDto } from './create-unite-mesure.dto';

export class UpdateUniteMesureDto extends PartialType(CreateUniteMesureDto) {}
