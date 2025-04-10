import { PartialType } from '@nestjs/mapped-types';
import { CreateTarificationDto } from './create-tarification.dto';

export class UpdateTarificationDto extends PartialType(CreateTarificationDto) {}
