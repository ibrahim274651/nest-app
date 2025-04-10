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
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { MenusService } from './menus.service';
import { FilterFundDto } from 'src/common/filter/filter.dto';

@ApiTags('Gestion menus')
@Controller('menu')
export class MenusController {
  constructor(private readonly menuService: MenusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Menu' })
  @ApiBody({
    description: 'Details of the menu to create',
    type: CreateMenuDto,
  })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Menus with pagination' })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filterFundDto: FilterFundDto,
  ) {
    return this.menuService.findAll(filterFundDto, pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Menu by its ID' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Menu by its ID' })
  @ApiBody({
    description: 'Updated details of the menu',
    type: UpdateMenuDto,
  })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Menu by its ID' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
