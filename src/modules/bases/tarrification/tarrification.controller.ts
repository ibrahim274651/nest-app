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
import { TarrificationService } from './tarrification.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateTarrificationDto } from './dto/create-tarrification.dto';
import { UpdateTarrificationDto } from './dto/update-tarrification.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiConstants } from 'src/app.constants';
import { FilterConsumptionModeDto } from 'src/common/filter/filter.dto';

const crud = ApiConstants.crud('tarification');
const tarifTva = ApiConstants.crud(
  '',
  'Get each tarification associated with it default tva and all tvas ',
);
const tarifMode = ApiConstants.crud(
  '',
  'Get tarification based on consomption mode ',
);

@ApiTags('Gestion tarrification')
@Controller('tarifications')
export class TarrificationController {
  constructor(private readonly tarificationService: TarrificationService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateTarrificationDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  async create(@Body() createTarrificationDto: CreateTarrificationDto) {
    console.log(createTarrificationDto);

    return this.tarificationService.create(createTarrificationDto);
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
  @ApiOperation({ summary: crud.findAll.summary_withoutPagination })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  async getDropdown() {
    return this.tarificationService.findTarrification();
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
  @ApiOperation({ summary: tarifMode.summary })
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
    type: UpdateTarrificationDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  async update(
    @Param('id') id: string,
    @Body() updateTarrificationDto: UpdateTarrificationDto,
  ) {
    return this.tarificationService.update(id, updateTarrificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.tarificationService.remove(id);
  }

  @Get('/tarif/tvas')
  @ApiOperation({ summary: tarifTva.summary })
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
