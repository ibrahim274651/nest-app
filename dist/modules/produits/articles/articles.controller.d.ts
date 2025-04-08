import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { FilterStockDto, FilterCategoryDto, FilterStoreDto } from 'src/common/filter/filter.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto, filterStockDto: FilterStockDto, filterCategoryDto: FilterCategoryDto): Promise<any>;
    findItemsByStore(stock?: FilterStoreDto): Promise<any>;
    dropDownCategoryItems(stock?: FilterStockDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<any>;
    remove(id: string): Promise<any>;
}
