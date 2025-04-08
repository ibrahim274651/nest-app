import { CreateUniteMesureDto } from './dto/create-unite-mesure.dto';
import { UpdateUniteMesureDto } from './dto/update-unite-mesure.dto';
import { UniteMesure } from './entities/unite-mesure.entity';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { VerificationService } from 'src/verification.service';
export declare class UniteMesureService {
    private uniteMesureModel;
    private readonly verificationService;
    private readonly responseI18nService;
    private readonly logger;
    constructor(uniteMesureModel: Model<UniteMesure>, verificationService: VerificationService, responseI18nService: ResponseI18nService);
    create(createUniteMesureDto: CreateUniteMesureDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    dropDownForUniteMesure(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, UpdateUniteMesureDto: UpdateUniteMesureDto): Promise<any>;
    remove(id: string): Promise<any>;
}
