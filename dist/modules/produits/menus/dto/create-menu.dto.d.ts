import { NiveauxDto } from '../../../../common/level.embedabble';
import { NestedTarificationDto } from 'src/common/tarification.embedabble';
import { NestedCatalogDto } from 'src/common/catalogue.embedabble';
export declare class CreateMenuDto {
    reference: string;
    designation: string;
    categorie: string;
    catalogue: NestedCatalogDto;
    articleGeneric: boolean;
    niveaux: NiveauxDto[];
    tarification?: NestedTarificationDto[];
    visibleCaisse: boolean;
    codeBarre?: string;
    description?: string;
    happyHour?: boolean;
}
