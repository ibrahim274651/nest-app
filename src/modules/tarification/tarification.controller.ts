import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TarificationService } from './tarification.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateTarificationDto } from './dto/create-tarification.dto';
import { UpdateTarificationDto } from './dto/update-tarification.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { FilterConsumptionModeDto } from 'src/common/filter/filter.dto';
import { ApiHelperConstants } from 'src/helpers/constants/controller.constants';

const crud = ApiHelperConstants.crud('tarification', '');
const tarifTva = ApiHelperConstants.crud(
  '',
  'Get each tarification associated with it default tva and all tvas ',
);
const tarifMode = ApiHelperConstants.crud(
  '',
  'Get tarification based on consomption mode ',
);

@ApiTags('Gestion tarification')
@Controller('tarifications')
export class TarificationController {
  constructor(private readonly tarificationService: TarificationService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateTarificationDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  async create(@Body() createTarificationDto: CreateTarificationDto) {
    console.log(createTarificationDto);

    return this.tarificationService.create(createTarificationDto);
  }

  @Get()
  @ApiOperation({ summary: crud.findAll.summary })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.tarificationService.findAll(pageOptionsDto);
  }

  @Get('/dropdown/list')
  @ApiOperation({ summary: crud.findAll.summaryListAll })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  async getDropdown() {
    return this.tarificationService.findTarification();
  }

  @Get(':id')
  @ApiOperation({ summary: crud.findOne.summary })
  @ApiResponse({
    status: 200,
    description: crud.findOne.response200,
  })
  @ApiResponse({
    status: 404,
    description: crud.findOne.response404,
  })
  async findOne(@Param('id') id: string) {
    return this.tarificationService.findOne(id);
  }

  @Get('list/consommation')
  @ApiOperation({ summary: tarifMode.summaryCustom })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 404,
    description: crud.findAll.response400,
  })
  async findByConsomation(@Query() filter: FilterConsumptionModeDto) {
    return this.tarificationService.findByConsomation(filter);
  }

  @Put(':id')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdateTarificationDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  async update(
    @Param('id') id: string,
    @Body() updateTarificationDto: UpdateTarificationDto,
  ) {
    return this.tarificationService.update(id, updateTarificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.tarificationService.remove(id);
  }

  @Get('/tarif/tvas')
  @ApiOperation({ summary: tarifTva.summaryCustom })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  async getDropdownData() {
    return this.tarificationService.getTarificationAndTvas();
  }
}
