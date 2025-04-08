import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { MenusService } from './menus.service';
import { FilterFundDto } from 'src/common/filter/filter.dto';
export declare class MenusController {
    private readonly menuService;
    constructor(menuService: MenusService);
    create(createMenuDto: CreateMenuDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto, filterFundDto: FilterFundDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<any>;
    remove(id: string): Promise<any>;
}
