import { CreateAccompagnementDto } from './dto/create-accompagnement.dto';
import { UpdateAccompagnementDto } from './dto/update-accompagnement.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { AccompagnementsService } from './accompagnements.service';
import { FilterStockDto } from 'src/common/filter/filter.dto';
export declare class AccompagnementsController {
    private readonly accompagnementService;
    constructor(accompagnementService: AccompagnementsService);
    create(createAccompagnementDto: CreateAccompagnementDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto, filterStockDto: FilterStockDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAccompagnementDto: UpdateAccompagnementDto): Promise<any>;
    remove(id: string): Promise<any>;
}
