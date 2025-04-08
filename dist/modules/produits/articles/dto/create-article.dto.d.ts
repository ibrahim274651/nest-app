import { NestedTarificationDto } from '../../../../common/tarification.embedabble';
import { FabricationNestedDto } from '../../../../common/fabrication.embedabble';
import { NestedCatalogDto } from 'src/common/catalogue.embedabble';
export declare class NestedUniteDto {
    unite: string;
    cond: number;
}
export declare class CreateArticleDto {
    reference: string;
    designation: string;
    categorie: string;
    seuilMinimum: number;
    codeBarre: string;
    catalogue: NestedCatalogDto;
    tarification: NestedTarificationDto[];
    gererStockProduit: boolean;
    cuisson: boolean;
    visibleCaisse: boolean;
    accompagnement?: string[];
    fabrication?: FabricationNestedDto[];
    articleGeneric: boolean;
    uniteDetails?: NestedUniteDto;
}
