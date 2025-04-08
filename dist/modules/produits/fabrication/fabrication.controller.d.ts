import { FabricationService } from './fabrication.service';
import { CreateFabricationDto } from './dto/create-fabrication.dto';
import { UpdateFabricationDto } from './dto/update-fabrication.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { FilterStockDto } from 'src/common/filter/filter.dto';
export declare class FabricationController {
    private readonly fabricationService;
    constructor(fabricationService: FabricationService);
    create(createFabricationDto: CreateFabricationDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto, filterStockDto: FilterStockDto): Promise<any>;
    findFabricationByStatus(filterStockDto: FilterStockDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFabricationDto: UpdateFabricationDto): Promise<any>;
    remove(id: string): Promise<any>;
}
