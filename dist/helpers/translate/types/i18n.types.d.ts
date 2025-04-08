import { I18nTranslations } from '../generated/i18n.generated';
export type GlobalKey = keyof I18nTranslations['global'];
type ValidationKey = keyof I18nTranslations['global']['VALIDATION'];
type ErrorKey = keyof I18nTranslations['global']['ERRORS']['VALIDATION_ERROR'];
export type EntityKey = keyof I18nTranslations['collection']['ENTITY'];
export type FieldKey = keyof I18nTranslations['collection']['FIELD'];
type OtherMessageKey = keyof I18nTranslations['otherMessage'];
type NestedOtherKey = `${keyof I18nTranslations['otherMessage']}.${string}`;
export type OtherKeyUnion = OtherMessageKey | NestedOtherKey;
export type ValidationErrorDetails = {
    key: OtherKeyUnion;
    fieldName?: FieldKey;
};
export type ValidationErrorParams = {
    key: ValidationKey;
    fieldName: FieldKey;
};
export type ErrorParams = {
    key: ErrorKey;
    fieldName: FieldKey;
};
export declare class ResponseData<T> {
    statusCode: number;
    message: string;
    data?: T;
    errors?: Error[];
    timestamp?: string;
}
export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    count: number;
    data: T[];
}
export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    count: number;
    data: T[];
    metadata?: Record<string, any>;
}
export {};
