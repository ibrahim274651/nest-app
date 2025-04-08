import { UniteMesureService } from './unite-mesure.service';
import { CreateUniteMesureDto } from './dto/create-unite-mesure.dto';
import { UpdateUniteMesureDto } from './dto/update-unite-mesure.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
export declare class UniteMesureController {
    private readonly uniteMesureService;
    constructor(uniteMesureService: UniteMesureService);
    create(createUniteMesureDto: CreateUniteMesureDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    getDropDown(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUniteMesureDto: UpdateUniteMesureDto): Promise<any>;
    remove(id: string): Promise<any>;
}
