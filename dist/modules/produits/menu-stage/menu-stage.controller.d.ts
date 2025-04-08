import { MenuStageService } from './menu-stage.service';
import { CreateMenuStageDto } from './dto/create-menu-stage.dto';
import { UpdateMenuStageDto } from './dto/update-menu-stage.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
export declare class MenuStageController {
    private readonly menuStageService;
    constructor(menuStageService: MenuStageService);
    create(createMenuStageDto: CreateMenuStageDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    dropDownForMenuOption(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateMenuStageDto: UpdateMenuStageDto): Promise<any>;
    remove(id: string): Promise<any>;
}
