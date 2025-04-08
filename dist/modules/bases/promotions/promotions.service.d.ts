import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { PipelineService } from 'src/helpers/pipeline/pipeline.service';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
export declare class PromotionsService {
    private readonly promotionModel;
    private readonly pipelineService;
    private readonly responseI18nService;
    private readonly logger;
    constructor(promotionModel: Model<Promotion>, pipelineService: PipelineService, responseI18nService: ResponseI18nService);
    create(dataDto: CreatePromotionDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    findItemsWhichHasPromotion(pageOptionsDto: PageOptionsDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<any>;
    remove(id: string): Promise<any>;
    private filterResults;
    private handleCreateError;
}
