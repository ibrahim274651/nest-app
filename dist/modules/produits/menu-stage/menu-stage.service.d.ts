import { MenuStage } from './entities/menu-stage.entity';
import { Model } from 'mongoose';
import { CreateMenuStageDto } from './dto/create-menu-stage.dto';
import { UpdateMenuStageDto } from './dto/update-menu-stage.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { VerificationService } from 'src/verification.service';
export declare class MenuStageService {
    private readonly menuStageModel;
    private readonly verificationService;
    private readonly responseI18nService;
    private readonly logger;
    constructor(menuStageModel: Model<MenuStage>, verificationService: VerificationService, responseI18nService: ResponseI18nService);
    create(createMenuStageDto: CreateMenuStageDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    dropDownForMenuOption(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateMenuStageDto: UpdateMenuStageDto): Promise<any>;
    remove(id: string): Promise<any>;
}
