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
import { MenuStageService } from './menu-stage.service';
import { CreateMenuStageDto } from './dto/create-menu-stage.dto';
import { UpdateMenuStageDto } from './dto/update-menu-stage.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiConstants } from 'src/app.constants';

const crud = ApiConstants.crud('menu stage');

@ApiTags('Option menu')
@Controller('menu-stage')
export class MenuStageController {
  constructor(private readonly menuStageService: MenuStageService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateMenuStageDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  create(@Body() createMenuStageDto: CreateMenuStageDto) {
    return this.menuStageService.create(createMenuStageDto);
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
    return this.menuStageService.findAll(pageOptionsDto);
  }

  @Get(' dropdown-option-menu')
  @ApiOperation({ summary: crud.findAll.summary_withoutPagination })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  dropDownForMenuOption() {
    return this.menuStageService.dropDownForMenuOption();
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
    return this.menuStageService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdateMenuStageDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  update(
    @Param('id') id: string,
    @Body() updateMenuStageDto: UpdateMenuStageDto,
  ) {
    return this.menuStageService.update(id, updateMenuStageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.menuStageService.remove(id);
  }
}
