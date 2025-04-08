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
import { CreateAccompagnementDto } from './dto/create-accompagnement.dto';
import { UpdateAccompagnementDto } from './dto/update-accompagnement.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { AccompagnementsService } from './accompagnements.service';
import { FilterStockDto } from 'src/common/filter/filter.dto';

@ApiTags('Gestion accompagnements')
@Controller('accompagnements')
export class AccompagnementsController {
  constructor(private readonly accompagnementService: AccompagnementsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new addon' })
  create(@Body() createAccompagnementDto: CreateAccompagnementDto) {
    return this.accompagnementService.create(createAccompagnementDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all addons with pagination',
  })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filterStockDto: FilterStockDto,
  ) {
    return this.accompagnementService.findAll(filterStockDto, pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific addon by its ID' })
  findOne(@Param('id') id: string) {
    return this.accompagnementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a specific addon by its ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateAccompagnementDto: UpdateAccompagnementDto,
  ) {
    return this.accompagnementService.update(id, updateAccompagnementDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a specific addon by its ID',
  })
  remove(@Param('id') id: string) {
    return this.accompagnementService.remove(id);
  }
}
