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
import { CuissonsService } from './cuissons.service';
import { CreateCuissonDto } from './dto/create-cuisson.dto';
import { UpdateCuissonDto } from './dto/update-cuisson.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiHelperConstants } from 'src/helpers/constants/controller.constants';

const crud = ApiHelperConstants.crud(' cuisson');

@ApiTags('Gestion cuissons')
@Controller('cuissons')
export class CuissonsController {
  constructor(private readonly cuissonsService: CuissonsService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateCuissonDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  create(@Body() createCuissonDto: CreateCuissonDto) {
    return this.cuissonsService.create(createCuissonDto);
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
    return this.cuissonsService.findAll(pageOptionsDto);
  }

  @Get('/dropdown')
  @ApiOperation({ summary: crud.findAll.summaryListAll })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  findForDropdown() {
    return this.cuissonsService.getDropdown();
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
    return this.cuissonsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdateCuissonDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  update(@Param('id') id: string, @Body() updateCuissonDto: UpdateCuissonDto) {
    return this.cuissonsService.update(id, updateCuissonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.cuissonsService.remove(id);
  }
}
