import { Model } from 'mongoose';
import { Tva } from './entities/tva.entity';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
export declare class TvaService {
    private tvaModel;
    private readonly responseI18nService;
    private readonly logger;
    constructor(tvaModel: Model<Tva>, responseI18nService: ResponseI18nService);
    create(createTvaDto: CreateTvaDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    findTva(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTvaDto: UpdateTvaDto): Promise<any>;
    remove(id: string): Promise<any>;
}
