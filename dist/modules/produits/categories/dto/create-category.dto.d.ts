import { NestedCatalogDto } from 'src/common/catalogue.embedabble';
export declare class CreateCategoryDto {
    designation: string;
    catalogue: NestedCatalogDto;
    stock: boolean;
    typeFamille: string;
    tarification: string[];
}
