import { HttpStatus } from '@nestjs/common';
import { TranslateService } from '../translate.service';
import { OtherKeyUnion, EntityKey, FieldKey, ResponseData, ErrorParams, ApiResponse } from '../types/i18n.types';
import { PageDto } from 'src/helpers/page-dto/page-dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
export declare class ResponseI18nService {
    private readonly i18n;
    constructor(i18n: TranslateService);
    private translate;
    private getTranslatedEntity;
    private getTranslatedField;
    private getOtherMessage;
    success<T>(data: T, entityKey: EntityKey): ResponseData<T>;
    fetchWithPagination<T>(data: T[], itemCount: number, pageOptionsDto: PageOptionsDto, entityKey: EntityKey): PageDto<T>;
    fetchAll<T>(data: T[], entityKey: EntityKey): ApiResponse<T>;
    create<T>(data: T, entityKey: EntityKey): ResponseData<T>;
    update<T>(data: T, entityKey: EntityKey): ResponseData<T>;
    delete<T>(data: T, entityKey: EntityKey): ResponseData<T>;
    notFound(): ResponseData<null>;
    notFoundData(entityKey: EntityKey): ResponseData<null>;
    conflict(field: FieldKey, value: string): ResponseData<null>;
    validationError({ key, fieldName }: ErrorParams): {
        statusCode: HttpStatus;
        message: string;
    };
    badRequest(key: OtherKeyUnion, args?: Record<string, any>): ResponseData<any>;
    handleError: (error: {
        name?: string;
        code?: string | number;
        status?: number;
        message?: string;
        entity?: string;
        keyValue?: Record<string, any>;
        value?: string;
        kind?: string;
    }) => never;
}
