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
import { FabricationService } from './fabrication.service';
import { CreateFabricationDto } from './dto/create-fabrication.dto';
import { UpdateFabricationDto } from './dto/update-fabrication.dto';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { FilterStockDto } from 'src/common/filter/filter.dto';

@ApiTags('Gestion fabrication')
@Controller('fabrication')
export class FabricationController {
  constructor(private readonly fabricationService: FabricationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new fabrication' })
  @ApiBody({
    type: CreateFabricationDto,
    description:
      'Provide fabrication details to create a new fabrication record.',
  })
  create(@Body() createFabricationDto: CreateFabricationDto) {
    return this.fabricationService.create(createFabricationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all fabrication with pagination' })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filterStockDto: FilterStockDto,
  ) {
    return this.fabricationService.findAll(filterStockDto, pageOptionsDto);
  }

  @Get('stock')
  @ApiOperation({ summary: 'Retrieve all fabrications by stock status' })
  async findFabricationByStatus(@Query() filterStockDto: FilterStockDto) {
    return this.fabricationService.findFabricationByStatus(filterStockDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific fabrication by its ID' })
  findOne(@Param('id') id: string) {
    return this.fabricationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific fabrication by its ID' })
  @ApiBody({
    type: UpdateFabricationDto,
    description: 'Provide updated details for the fabrication.',
  })
  update(
    @Param('id') id: string,
    @Body() updateFabricationDto: UpdateFabricationDto,
  ) {
    return this.fabricationService.update(id, updateFabricationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific fabrication by its ID' })
  remove(@Param('id') id: string) {
    return this.fabricationService.remove(id);
  }
}
