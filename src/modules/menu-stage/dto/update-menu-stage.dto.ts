import { PartialType } from '@nestjs/swagger';
import { CreateMenuStageDto } from './create-menu-stage.dto';

export class UpdateMenuStageDto extends PartialType(CreateMenuStageDto) {}
