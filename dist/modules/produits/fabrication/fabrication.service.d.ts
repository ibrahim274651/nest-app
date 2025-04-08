import { CreateFabricationDto } from './dto/create-fabrication.dto';
import { UpdateFabricationDto } from './dto/update-fabrication.dto';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { Fabrication } from './entities/fabrication.entity';
import { FabricationNestedDto } from '../../../common/fabrication.embedabble';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { FilterStockDto } from 'src/common/filter/filter.dto';
import { AppHelperService } from 'src/helpers/app.helper.service';
import { VerificationService } from 'src/verification.service';
export declare class FabricationService {
    private readonly fabModel;
    private readonly responseI18nService;
    private readonly verificationService;
    private readonly appHelperService;
    private readonly logger;
    constructor(fabModel: Model<Fabrication>, responseI18nService: ResponseI18nService, verificationService: VerificationService, appHelperService: AppHelperService);
    create(dataDto: CreateFabricationDto): Promise<any>;
    findAll(filterStockDto: FilterStockDto, pageOptionsDto: PageOptionsDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFabricationDto: UpdateFabricationDto): Promise<any>;
    remove(id: string): Promise<any>;
    findFabricationByStatus(filterStockDto: FilterStockDto): Promise<any>;
    validateMultipleFabrications(fabrications: FabricationNestedDto[]): Promise<FabricationNestedDto[]>;
    private validateFabrication;
}
