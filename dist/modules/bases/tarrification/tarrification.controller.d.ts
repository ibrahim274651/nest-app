import { TarrificationService } from './tarrification.service';
import { CreateTarrificationDto } from './dto/create-tarrification.dto';
import { UpdateTarrificationDto } from './dto/update-tarrification.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { FilterConsumptionModeDto } from 'src/common/filter/filter.dto';
export declare class TarrificationController {
    private readonly tarificationService;
    constructor(tarificationService: TarrificationService);
    create(createTarrificationDto: CreateTarrificationDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    getDropdown(): Promise<any>;
    findOne(id: string): Promise<any>;
    findByConsomation(filter: FilterConsumptionModeDto): Promise<any>;
    update(id: string, updateTarrificationDto: UpdateTarrificationDto): Promise<any>;
    remove(id: string): Promise<any>;
    getDropdownData(): Promise<any>;
}
