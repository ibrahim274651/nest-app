import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { FilterConsumptionModeDto, FilterStockDto, FilterTypeCategoryDto } from 'src/common/filter/filter.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    getDropdownForCategory(typeFamille: FilterTypeCategoryDto, stock: FilterStockDto): Promise<any>;
    getCategoryByMode(stock: FilterStockDto, filter: FilterConsumptionModeDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any>;
    remove(id: string): Promise<any>;
}
