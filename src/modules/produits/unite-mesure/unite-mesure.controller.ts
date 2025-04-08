import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UniteMesureService } from './unite-mesure.service';
import { CreateUniteMesureDto } from './dto/create-unite-mesure.dto';
import { UpdateUniteMesureDto } from './dto/update-unite-mesure.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiConstants } from 'src/app.constants';

const crud = ApiConstants.crud('unit of measure');
const dropDown = ApiConstants.crud(
  '',
  'Get the dropdown list for the unit of measurement',
);

@ApiTags('Unite de mesure')
@Controller('unite-mesure')
export class UniteMesureController {
  constructor(private readonly uniteMesureService: UniteMesureService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateUniteMesureDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  create(@Body() createUniteMesureDto: CreateUniteMesureDto) {
    return this.uniteMesureService.create(createUniteMesureDto);
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
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.uniteMesureService.findAll(pageOptionsDto);
  }

  @Get('dropdown-unite')
  @ApiOperation({ summary: dropDown.summary })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  getDropDown() {
    return this.uniteMesureService.dropDownForUniteMesure();
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
  findOne(@Param('id') id: string) {
    return this.uniteMesureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdateUniteMesureDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  update(
    @Param('id') id: string,
    @Body() updateUniteMesureDto: UpdateUniteMesureDto,
  ) {
    return this.uniteMesureService.update(id, updateUniteMesureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.uniteMesureService.remove(id);
  }
}
