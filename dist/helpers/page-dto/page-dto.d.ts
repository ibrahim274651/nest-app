import { PageMetaDto } from '../page-meta-dto/page-meta-dto';
export declare class PageDto<T> {
    readonly statusCode: number;
    readonly message: string;
    readonly data: T[];
    readonly meta: PageMetaDto;
    constructor(data: T[], meta: PageMetaDto, statusCode?: number, message?: string);
}
