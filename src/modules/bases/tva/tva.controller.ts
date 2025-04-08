import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { TvaService } from './tva.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiConstants } from 'src/app.constants';

const crud = ApiConstants.crud('vat');

@ApiTags('Gestion TVAs')
@Controller('tvas')
export class TvaController {
  constructor(private readonly tvaService: TvaService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateTvaDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  create(@Body() createTvaDto: CreateTvaDto) {
    return this.tvaService.create(createTvaDto);
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
    return this.tvaService.findAll(pageOptionsDto);
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
    return this.tvaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdateTvaDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  update(@Param('id') id: string, @Body() updateTvaDto: UpdateTvaDto) {
    return this.tvaService.update(id, updateTvaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.tvaService.remove(id);
  }
  // MICROSERVICE
  // @MessagePattern({ cmd: 'get_tva' })
  // async findTva() {
  //   return this.tvaService.findTva();
  // }

  // @MessagePattern({ cmd: 'get_tva_by_id' })
  // async findTvaByID(data: { id: string }) {
  //   const { id } = data;
  //   const tva = await this.tvaService.findOne(id);
  //   return {
  //     _id: tva.data._id,
  //     compte_comptable_collecte: tva.data.compte_comptable_collecte,
  //     compte_comptable_vente: tva.data.compte_comptable_vente,
  //   };
  // }
}
