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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiConstants } from 'src/app.constants';
import {
  FilterConsumptionModeDto,
  FilterStockDto,
  FilterTypeCategoryDto,
} from 'src/common/filter/filter.dto';

const crud = ApiConstants.crud('category');

@ApiTags('Gestion categorie')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateCategoryDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log('DTO:', createCategoryDto);
    return this.categoriesService.create(createCategoryDto);
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
    return this.categoriesService.findAll(pageOptionsDto);
  }

  @Get('dropdown-image')
  @ApiOperation({
    summary:
      'Get the dropdown list of categories (filter based on famille and stock) optional',
  })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  async getDropdownForCategory(
    @Query() typeFamille: FilterTypeCategoryDto,
    @Query() stock: FilterStockDto,
  ) {
    return await this.categoriesService.getdropDownForCategory(
      typeFamille,
      stock,
    );
  }

  @Get('type-mode')
  @ApiOperation({ summary: 'Get categories base on consumption mode' })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  async getCategoryByMode(
    @Query() stock: FilterStockDto,
    @Query() filter: FilterConsumptionModeDto,
  ) {
    console.log('filter DTO:', filter);
    console.log('stock DTO:', stock);
    return await this.categoriesService.getCategoryByTarif(filter, stock);
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
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdateCategoryDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
