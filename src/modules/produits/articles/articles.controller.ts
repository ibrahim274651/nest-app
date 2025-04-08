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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import {
  FilterStockDto,
  FilterCategoryDto,
  FilterStoreDto,
  FilterForItemDto,
} from 'src/common/filter/filter.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Gestion articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiBody({
    type: CreateArticleDto,
    description: 'Details of the article to be created',
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    const article = this.articlesService.create(createArticleDto);
    return article;
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filterStockDto: FilterStockDto,
    @Query() filterCategoryDto: FilterCategoryDto,
  ) {
    return this.articlesService.findAll(
      filterStockDto,
      filterCategoryDto,
      pageOptionsDto,
    );
  }

  @ApiOperation({ summary: 'Get items by store' })
  @Get('items-store')
  findItemsByStore(@Query() stock?: FilterStoreDto) {
    return this.articlesService.findItemsByStore(stock);
  }

  @ApiOperation({ summary: 'Get all items by category' })
  @Get('category-item')
  dropDownCategoryItems(@Query() stock?: FilterStockDto) {
    return this.articlesService.dropDownCategoryItems(stock);
  }

  @ApiOperation({ summary: 'Get a specific article by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiBody({
    type: UpdateArticleDto,
    description: 'Details of the article to be updated',
  })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const updatedArticle = this.articlesService.update(id, updateArticleDto);
    return updatedArticle;
  }

  @ApiOperation({ summary: 'Delete an articles' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
