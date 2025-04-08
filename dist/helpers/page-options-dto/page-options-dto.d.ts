export declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class PageOptionsDto {
    readonly order?: Order;
    readonly page?: number;
    readonly take?: number;
    readonly search?: string;
    get skip(): number;
}
