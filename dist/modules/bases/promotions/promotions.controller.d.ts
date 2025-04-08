import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
export declare class PromotionsController {
    private readonly promotionsService;
    constructor(promotionsService: PromotionsService);
    create(createPromotionDto: CreatePromotionDto): Promise<any>;
    getArticle(pageOptionsDto: PageOptionsDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<any>;
    remove(id: string): Promise<any>;
}
