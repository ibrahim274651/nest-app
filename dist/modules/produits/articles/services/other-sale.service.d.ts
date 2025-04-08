import { Model } from 'mongoose';
import { FilterForItemDto } from 'src/common/filter/filter.dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { Tarrification } from 'src/modules/bases/tarrification/entities/tarrification.entity';
import { Tva } from 'src/modules/bases/tva/entities/tva.entity';
import { PipelineService } from 'src/pipeline';
import { Accompagnement } from '../../accompagnements/entities/accompagnement.entity';
import { Article } from '../entities/article.entity';
export declare class ItemForSaleService {
    private itemModel;
    private tvaModel;
    private tarifModel;
    private accModel;
    private readonly pipelineService;
    private readonly responseI18nService;
    private readonly logger;
    private ipAddress;
    private port;
    private baseUrl;
    constructor(itemModel: Model<Article>, tvaModel: Model<Tva>, tarifModel: Model<Tarrification>, accModel: Model<Accompagnement>, pipelineService: PipelineService, responseI18nService: ResponseI18nService);
    itemsTemplate(filterDto?: FilterForItemDto): Promise<any>;
}
