import { GlobalStatus, ConsumptionMode } from '@/utils/enumerations.enum';
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
export declare class FilterMovementDto {
    typeMouvement: string;
}
export declare class FilterOperationDto {
    typeOperation?: string;
}
export declare class FilterTypeCategoryDto {
    typeFamille: string;
}
export declare class FilterGlobalStatusDto {
    status?: GlobalStatus;
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
    readonly storeId?: string;
}
export declare class FilterForItemDto {
    readonly itemId?: string;
    categoryId?: string;
    enable: boolean;
    visible: boolean;
    tarificationId?: string;
    mode?: ConsumptionMode;
    readonly storeId?: string;
}
