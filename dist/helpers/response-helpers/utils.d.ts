export declare class ResponseData<T> {
    statusCode: number;
    message: string;
    data?: T;
    errors?: Error[];
}
export interface PaginationData<T> {
    content: T[];
    total: number;
    limit: number;
    page: number;
    pageSize: number;
}
export declare class ResponsePaginateDto {
    readonly page?: number;
    readonly limit?: number;
}
export declare class ResponseStorePaginateDto extends ResponsePaginateDto {
    readonly storeId: string;
}
export declare class ResponsePaginateBycountryDto extends ResponsePaginateDto {
    readonly country: string;
}
export declare class ErrorDto {
    message: string;
    field?: string;
}
export declare class ResponseDataDto<T> {
    statusCode: number;
    message: string;
    data?: T;
}
export declare class DataPagination<T> {
    content: T[];
    total: number;
    limit?: number;
    page?: number;
    pageSize: number;
}
export declare class ResponseDataPagianationDto<DataPagination> {
    statusCode: number;
    message: string;
    data: DataPagination;
}
export declare class ResponseDataDTO<T> {
    statusCode: number;
    message: string;
    data?: T;
    errors?: Error[];
}
