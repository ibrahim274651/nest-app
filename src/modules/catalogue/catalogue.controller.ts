import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatalogueService } from './catalogue.service';
import {
  CreateCatalogueDto,
  DeleteImageDto,
  OtherImageDto,
} from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ApiHelperConstants } from 'src/helpers/constants/controller.constants';
import { multerOptions } from 'src/helpers/file-upload/file-upload';

const crud = ApiHelperConstants.crud('catalog');
const deleteMore = ApiHelperConstants.crud(
  '',
  'The information required to delete an image from the catalogue',
);

@ApiTags('Catalog management')
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: crud.create.summary })
  @ApiBody({
    type: CreateCatalogueDto,
    description: crud.create.bodyDescription,
  })
  @ApiResponse({ status: 201, description: crud.create.response201 })
  @ApiResponse({ status: 400, description: crud.create.response400 })
  @UseInterceptors(FilesInterceptor('images', 5, multerOptions))
  async create(
    @Body() createCatalogueDto: CreateCatalogueDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.catalogueService.create(createCatalogueDto, files);
  }

  @Patch('add-image/list/:id')
  @ApiOperation({ summary: 'Add a new image to the images array' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: OtherImageDto,
    description:
      'The information required to add an additional image to the catalogue',
  })
  @UseInterceptors(FilesInterceptor('images', 20, multerOptions))
  async addImageToAutreImage(
    @Param('id') id: string,
    @Body() otherImageDto: OtherImageDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.catalogueService.addImageToOtherImage(id, otherImageDto, files);
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
    return this.catalogueService.findAll(pageOptionsDto);
  }

  @Get('dropdown')
  @ApiOperation({ summary: 'Get a dropdown list of catalogues' })
  async getDropdownForCategory() {
    return await this.catalogueService.dropDownForCatalogue();
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
    return this.catalogueService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: crud.update.summary })
  @ApiBody({
    type: UpdateCatalogueDto,
    description: crud.update.bodyDescription,
  })
  @ApiResponse({ status: 200, description: crud.update.response200 })
  @ApiResponse({ status: 400, description: crud.update.response400 })
  @ApiResponse({ status: 404, description: crud.update.response404 })
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateCatalogueDto: UpdateCatalogueDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.catalogueService.update(id, updateCatalogueDto, files);
  }

  @Delete(':id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  remove(@Param('id') id: string) {
    return this.catalogueService.remove(id);
  }

  @Post('delete-image/:id')
  @ApiOperation({ summary: crud.remove.summary })
  @ApiResponse({ status: 204, description: crud.remove.response204 })
  @ApiResponse({ status: 404, description: crud.remove.response404 })
  @ApiBody({
    type: DeleteImageDto,
    description: deleteMore.descriptionCustom,
  })
  async deleteImageFromOtherImage(
    @Param('id') id: string,
    @Body() imageToRemove: DeleteImageDto,
  ) {
    const result = await this.catalogueService.deleteImageFromOtherImage(
      id,
      imageToRemove,
    );
    return result;
  }
}
