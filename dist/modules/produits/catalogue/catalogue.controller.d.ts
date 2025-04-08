import { CatalogueService } from './catalogue.service';
import { CreateCatalogueDto, DeleteImageDto, OtherImageDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
export declare class CatalogueController {
    private readonly catalogueService;
    constructor(catalogueService: CatalogueService);
    create(createCatalogueDto: CreateCatalogueDto, files: Express.Multer.File[]): Promise<any>;
    addImageToAutreImage(id: string, otherImageDto: OtherImageDto, files: Express.Multer.File[]): Promise<any>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<any>;
    getDropdownForCategory(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCatalogueDto: UpdateCatalogueDto, files: Express.Multer.File[]): Promise<any>;
    remove(id: string): Promise<any>;
    deleteImageFromOtherImage(id: string, imageToRemove: DeleteImageDto): Promise<any>;
}
