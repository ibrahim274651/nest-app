import { PageMetaDtoParameters } from '../page-meta-dto-parameters/page-meta-dto-parameters';
export declare class PageMetaDto {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters);
}
