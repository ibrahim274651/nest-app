import { CuissonsService } from './cuissons.service';
import { CreateCuissonDto } from './dto/create-cuisson.dto';
import { UpdateCuissonDto } from './dto/update-cuisson.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
export declare class CuissonsController {
    private readonly cuissonsService;
    constructor(cuissonsService: CuissonsService);
    create(createCuissonDto: CreateCuissonDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    findForDropdown(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCuissonDto: UpdateCuissonDto): Promise<any>;
    remove(id: string): Promise<any>;
}
