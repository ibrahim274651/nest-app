import { FilterForItemDto } from 'src/common/filter/filter.dto';
import { PipelineService } from 'src/helpers/pipeline';
import { Model } from 'mongoose';
import { Article } from '../entities/article.entity';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { Accompagnement } from '../../accompagnements/entities/accompagnement.entity';
import { Tva } from 'src/settings/bases/tva/entities/tva.entity';
import { Tarrification } from 'src/settings/bases/tarrification/entities/tarrification.entity';
import { Mouvement } from 'src/mouvements-stock/mouvement/entities/mouvement.entity';
import { Store } from 'src/stores/entities/store.entity';
export declare class ItemForTestService {
    private itemModel;
    private tvaModel;
    private tarifModel;
    private accModel;
    private mvtModel;
    private storeModel;
    private readonly pipelineService;
    private readonly responseI18nService;
    private readonly logger;
    private ipAddress;
    private port;
    private baseUrl;
    constructor(itemModel: Model<Article>, tvaModel: Model<Tva>, tarifModel: Model<Tarrification>, accModel: Model<Accompagnement>, mvtModel: Model<Mouvement>, storeModel: Model<Store>, pipelineService: PipelineService, responseI18nService: ResponseI18nService);
    itemsTemplate(filterDto?: FilterForItemDto): Promise<any>;
}
