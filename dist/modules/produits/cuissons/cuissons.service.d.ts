import { CreateCuissonDto } from './dto/create-cuisson.dto';
import { UpdateCuissonDto } from './dto/update-cuisson.dto';
import { Cuisson } from './entities/cuisson.entity';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { CatalogueService } from '../catalogue/catalogue.service';
import { AppHelperService } from 'src/helpers/app.helper.service';
export declare class CuissonsService {
    private readonly cuissonModel;
    private readonly catalogueService;
    private readonly appHelperService;
    private readonly responseI18nService;
    private readonly logger;
    constructor(cuissonModel: Model<Cuisson>, catalogueService: CatalogueService, appHelperService: AppHelperService, responseI18nService: ResponseI18nService);
    private beforeCreateOrUpdate;
    create(dto: CreateCuissonDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    getDropdown(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDto: UpdateCuissonDto): Promise<any>;
    remove(id: string): Promise<any>;
    private formatCuissonData;
}
