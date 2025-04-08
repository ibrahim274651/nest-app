import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CategorieType,
  ConsumptionMode,
  FabricationType,
  GlobalStatus,
  MouvementType,
  OperationTypeIn,
  OperationTypeOut,
  OtherType,
} from '../enumerations.enum';

@ApiTags('Enum Type')
@Controller('enum-type')
export class EnumTypeController {
  @ApiOperation({ summary: 'Get three categories types to use in article' })
  @Get()
  getCategorieType() {
    const excludedTypes = ['FABRICATION'];
    const type = Object.values(CategorieType)
      .filter((value) => !excludedTypes.includes(value))
      .map((value) => value);

    return {
      message: 'Available categories types',
      data: type,
    };
  }

  @Get('category-type')
  @ApiOperation({ summary: 'Get all categories types' })
  getCategorieTypes() {
    const type = Object.values(CategorieType);
    return {
      message: 'Available categories types',
      data: type,
    };
  }

  @Get('fabrication-type')
  @ApiOperation({ summary: 'Get all fabrication types' })
  getFabricationType() {
    const type = Object.values(FabricationType);
    return {
      message: 'Available fabrication types',
      data: type,
    };
  }

  @ApiOperation({ summary: 'Get other mouvement types ' })
  @Get('mouvement-types/all')
  getOtherMouvementTypes() {
    return {
      message: 'All available mouvement types',
      data: Object.values(OtherType),
    };
  }

  @ApiOperation({ summary: 'Get all mouvement types (general)' })
  @Get('mouvement-types/general')
  getGeneralMouvementTypes() {
    return {
      message: 'Available general mouvement types',
      data: Object.values(MouvementType),
    };
  }

  @ApiOperation({ summary: 'Get all incoming mouvement types' })
  @Get('mouvement-types/in')
  getIncomingMouvementTypes() {
    return {
      message: 'Available incoming mouvement types',
      data: Object.values(OperationTypeIn),
    };
  }

  @ApiOperation({ summary: 'Get all outgoing mouvement types' })
  @Get('mouvement-types/out')
  getOutgoingMouvementTypes() {
    return {
      message: 'Available outgoing mouvement types',
      data: Object.values(OperationTypeOut),
    };
  }

  @ApiOperation({ summary: 'Get all transfer status' })
  @Get('transfert-status')
  getTransferStatus() {
    return {
      message: 'Available outgoing mouvement types',
      data: Object.values(GlobalStatus),
    };
  }

  @ApiOperation({ summary: 'Get all  consomption mode' })
  @Get('/type-mode')
  getModeTypes() {
    return {
      message: 'Available types',
      data: Object.values(ConsumptionMode),
    };
  }
}
