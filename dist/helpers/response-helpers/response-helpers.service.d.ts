import { PaginationData, ResponseData } from './utils';
import { PageDto } from '../page-dto/page-dto';
import { PageOptionsDto } from '../page-options-dto/page-options-dto';
export declare class ResponseHelpersService {
    success<T>(data: T, message?: string): ResponseData<T>;
    fetchWithPagination<T>(data: T[], itemCount: number, pageOptionsDto: PageOptionsDto, message?: string): PageDto<T>;
    create<T>(data: T, message?: string): ResponseData<T>;
    error(message: string, errors?: Error[]): ResponseData<any>;
    notFound(message?: string): ResponseData<any>;
    conflict(message?: string): ResponseData<any>;
    pagination<T>(data: T[], total: number, limit: number | undefined, page: number | undefined, pageSize: number): ResponseData<PaginationData<T>>;
    update<T>(data: T, message?: string): ResponseData<T>;
    delete<T>(data: T, message?: string): ResponseData<T>;
    badRequest(message?: string): ResponseData<any>;
    handleError: (error: any) => never;
}
export declare const handleError: (error: any) => never;
