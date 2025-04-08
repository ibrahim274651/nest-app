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
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiConstants } from 'src/app.constants';

const crud = ApiConstants.crud('promotion');
const itemByPromotion = ApiConstants.crud('item', 'promotion');

@ApiTags('Gestion promotion')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreatePromotionDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  @ApiOperation({ summary: 'Create a new promotion' })
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(createPromotionDto);
  }

  @Get('/article')
  @ApiOperation({ summary: itemByPromotion.findAll.summary_withOtherEntity })
  @ApiResponse({
    status: 200,
    description: crud.findAll.response200,
  })
  @ApiResponse({
    status: 400,
    description: crud.findAll.response400,
  })
  getArticle(@Query() pageOptionsDto: PageOptionsDto) {
    return this.promotionsService.findItemsWhichHasPromotion(pageOptionsDto);
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
    return this.promotionsService.findAll(pageOptionsDto);
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
    return this.promotionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdatePromotionDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionsService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.promotionsService.remove(id);
  }

  // MICROSERVICE
  // @MessagePattern({ cmd: 'get_promotion' })
  // findPromotion() {
  //   return this.promotionsService.findPromotion();
  // }

  // @MessagePattern({ cmd: 'get_promotion_by_id' })
  // async findPromotionByID(data: { id: string }) {
  //   const { id } = data;
  //   const promotion = await this.promotionsService.findOne(id);
  //   return {
  //     promotion,
  //   };
  // }
}
