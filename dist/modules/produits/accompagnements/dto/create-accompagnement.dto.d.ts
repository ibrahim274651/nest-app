import { NestedCatalogDto } from 'src/common/catalogue.embedabble';
import { FabricationNestedDto } from 'src/common/fabrication.embedabble';
import { NestedTarificationDto } from 'src/common/tarification.embedabble';
export declare class CreateAccompagnementDto {
    reference: string;
    designation: string;
    categorie: string;
    catalogue: NestedCatalogDto;
    tarification: NestedTarificationDto[];
    gererStockProduit: boolean;
    stockMini: number;
    fabrication?: FabricationNestedDto[];
    visibleCaisse: boolean;
    accompGeneric: boolean;
    description: string;
}
