import { TvaService } from './tva.service';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
export declare class TvaController {
    private readonly tvaService;
    constructor(tvaService: TvaService);
    create(createTvaDto: CreateTvaDto): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTvaDto: UpdateTvaDto): Promise<any>;
    remove(id: string): Promise<any>;
}
