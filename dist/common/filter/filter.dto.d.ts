import { ConsumptionMode } from 'src/utils/enumerations.enum';
export declare class FilterStockDto {
    enable: boolean;
}
export declare class FilterFundDto {
    enable: boolean;
}
export declare class FilterCategoryDto {
    categoryId?: string;
}
export declare class FilterItemDto {
    readonly itemId?: string;
}
export declare class FilterStoreDto {
    readonly storeId?: string;
}
export declare class FilterTypeCategoryDto {
    typeFamille: string;
}
export declare class FilterConsumptionModeDto {
    tarificationId?: string;
    mode?: ConsumptionMode;
}
export declare class FilterForTarificationDto {
    readonly itemId?: string;
    categoryId?: string;
    enable: boolean;
    tarificationId?: string;
    mode?: ConsumptionMode;
}
