import { Model } from 'mongoose';
import { CreateTarrificationDto } from './dto/create-tarrification.dto';
import { Tarrification } from './entities/tarrification.entity';
import { UpdateTarrificationDto } from './dto/update-tarrification.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { TvaService } from '../tva/tva.service';
import { NestedTarificationDto } from 'src/common/tarification.embedabble';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { FilterConsumptionModeDto } from 'src/common/filter/filter.dto';
export declare class TarrificationService {
    private tarificationModel;
    private readonly tvaService;
    private readonly responseI18nService;
    private readonly logger;
    constructor(tarificationModel: Model<Tarrification>, tvaService: TvaService, responseI18nService: ResponseI18nService);
    create(createTarrificationDto: CreateTarrificationDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    findOne(id: string): Promise<any>;
    findByConsomation(tarif: FilterConsumptionModeDto): Promise<any>;
    update(id: string, updateTarrificationDto: UpdateTarrificationDto): Promise<any>;
    remove(id: string): Promise<any>;
    findTarrification(): Promise<any>;
    getTarificationAndTvas(): Promise<any>;
    validateTvaAndTarification(tarifications: NestedTarificationDto): Promise<{
        tarification: any;
        tva: any;
        caisse: any;
        prixTTC: any;
        prixHT: any;
    }>;
    validateMultipleTvasAndTarifications(tarifications: NestedTarificationDto[]): Promise<NestedTarificationDto[]>;
    validateTarificationId(ids: string[]): Promise<string[] | any>;
}
