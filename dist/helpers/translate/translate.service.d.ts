import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { I18nPath, I18nTranslations } from './generated/i18n.generated';
export type SupportedLang = 'en' | 'fr';
export declare const defaultLang: SupportedLang;
export declare class TranslateService {
    private readonly request;
    private readonly i18nService;
    constructor(request: Request, i18nService: I18nService<I18nTranslations>);
    t(key: string): string;
    translate(key: I18nPath, options?: Record<string, any>): string | {
        TVA: string;
        TARIFICATION: string;
        PROMOTION: string;
        CATEGORY: string;
        CUISSON: string;
        CATALOGUE: string;
        ARTICLE: string;
        MENU_STAGE: string;
        MENU: string;
        ACCOMPAGNEMENT: string;
        FABRICATION: string;
        UNITE_MESURE: string;
    } | {
        FILE: string;
        _id: string;
        designation: string;
        tarification: string;
        codeBarre: string;
        nif: string;
        fax: string;
        email: string;
        telephone: string;
        prixttc: string;
        prixht: string;
        quantity: string;
        date: string;
        time: string;
    } | {
        ENTITY: {
            "TVA": string;
            "TARIFICATION": string;
            "PROMOTION": string;
            "CATEGORY": string;
            "CUISSON": string;
            "CATALOGUE": string;
            "ARTICLE": string;
            "MENU_STAGE": string;
            "MENU": string;
            "ACCOMPAGNEMENT": string;
            "FABRICATION": string;
            "UNITE_MESURE": string;
        };
        FIELD: {
            "FILE": string;
            "_id": string;
            "designation": string;
            "tarification": string;
            "codeBarre": string;
            "nif": string;
            "fax": string;
            "email": string;
            "telephone": string;
            "prixttc": string;
            "prixht": string;
            "quantity": string;
            "date": string;
            "time": string;
        };
    } | {
        SUCCESS: string;
        ERROR: string;
        UNAUTHORIZED: string;
        VALIDATION_ERROR: string;
    } | {
        SUCCESS: string;
        EMPTY: string;
        PARTIAL_SUCCESS: string;
        ERROR: string;
        UNAUTHORIZED: string;
        NOT_FOUND: string;
        VALIDATION_ERROR: string;
    } | {
        SUCCESS: string;
        NOT_FOUND: string;
        UNAUTHORIZED: string;
        ERROR: string;
        VALIDATION_ERROR: string;
    } | {
        SUCCESS: string;
        NOT_FOUND: string;
        UNAUTHORIZED: string;
        ERROR: string;
        CONFIRMATION: string;
    } | {
        CREATE: {
            "SUCCESS": string;
            "ERROR": string;
            "UNAUTHORIZED": string;
            "VALIDATION_ERROR": string;
        };
        READ: {
            "SUCCESS": string;
            "EMPTY": string;
            "PARTIAL_SUCCESS": string;
            "ERROR": string;
            "UNAUTHORIZED": string;
            "NOT_FOUND": string;
            "VALIDATION_ERROR": string;
        };
        UPDATE: {
            "SUCCESS": string;
            "NOT_FOUND": string;
            "UNAUTHORIZED": string;
            "ERROR": string;
            "VALIDATION_ERROR": string;
        };
        DELETE: {
            "SUCCESS": string;
            "NOT_FOUND": string;
            "UNAUTHORIZED": string;
            "ERROR": string;
            "CONFIRMATION": string;
        };
    } | {
        SUCCESS: string;
        ERROR: string;
        UNAUTHORIZED: string;
    } | {
        SUCCESS: string;
        ERROR: string;
    } | {
        LOGIN: {
            "SUCCESS": string;
            "ERROR": string;
            "UNAUTHORIZED": string;
        };
        LOGOUT: {
            "SUCCESS": string;
            "ERROR": string;
        };
        FORBIDDEN: string;
        EXPIRED_TOKEN: string;
    } | {
        ACCESS_DENIED: string;
        MISSING_ROLE: string;
    } | {
        REQUIRED: string;
        INVALID: string;
        MIN_LENGTH: string;
        MAX_LENGTH: string;
    } | {
        FIELD: string;
        MISSING: string;
        FORMAT: string;
        RANGE: string;
        DEFAULT: string;
        UNEXPECTED: string;
        UNEXPECTED_MESSAGE: string;
    } | {
        GENERAL: string;
        INVALID_INPUT: string;
        INVALID_DATA: string;
        INVALID_ID: string;
        NOT_FOUND: string;
        NO_DATA: string;
        UNAUTHORIZED: string;
        FORBIDDEN: string;
        CONNECTION: string;
        SERVICE_UNAVAILABLE: string;
        CONNECTION_RESET: string;
        TIMEOUT: string;
        SERVER_ERROR: string;
        CONFLICT: string;
        VALIDATION_ERROR: {
            "FIELD": string;
            "MISSING": string;
            "FORMAT": string;
            "RANGE": string;
            "DEFAULT": string;
            "UNEXPECTED": string;
            "UNEXPECTED_MESSAGE": string;
        };
    } | {
        LOADING: string;
        ACTION_SUCCESS: string;
        ACTION_ERROR: string;
        RETRY: string;
        LOADING_DATA: string;
        RETRY_ACTION: string;
        REFRESH_DATA: string;
        ACTION_FAILED: string;
        NO_RESULTS_FOUND: string;
    } | {
        SUCCESS: string;
        EMPTY: string;
        PARTIAL_SUCCESS: string;
        ERROR: string;
        UNAUTHORIZED: string;
        NOT_FOUND: string;
        VALIDATION_ERROR: string;
    } | {
        LOADING: string;
        RETRY: string;
        REFRESH: string;
        ACTION_FAILED: string;
        NO_RESULTS: string;
    } | {
        CRUD: {
            "CREATE": {
                "SUCCESS": string;
                "ERROR": string;
                "UNAUTHORIZED": string;
                "VALIDATION_ERROR": string;
            };
            "READ": {
                "SUCCESS": string;
                "EMPTY": string;
                "PARTIAL_SUCCESS": string;
                "ERROR": string;
                "UNAUTHORIZED": string;
                "NOT_FOUND": string;
                "VALIDATION_ERROR": string;
            };
            "UPDATE": {
                "SUCCESS": string;
                "NOT_FOUND": string;
                "UNAUTHORIZED": string;
                "ERROR": string;
                "VALIDATION_ERROR": string;
            };
            "DELETE": {
                "SUCCESS": string;
                "NOT_FOUND": string;
                "UNAUTHORIZED": string;
                "ERROR": string;
                "CONFIRMATION": string;
            };
        };
        AUTH: {
            "LOGIN": {
                "SUCCESS": string;
                "ERROR": string;
                "UNAUTHORIZED": string;
            };
            "LOGOUT": {
                "SUCCESS": string;
                "ERROR": string;
            };
            "FORBIDDEN": string;
            "EXPIRED_TOKEN": string;
        };
        ROLES: {
            "ACCESS_DENIED": string;
            "MISSING_ROLE": string;
        };
        VALIDATION: {
            "REQUIRED": string;
            "INVALID": string;
            "MIN_LENGTH": string;
            "MAX_LENGTH": string;
        };
        ERRORS: {
            "GENERAL": string;
            "INVALID_INPUT": string;
            "INVALID_DATA": string;
            "INVALID_ID": string;
            "NOT_FOUND": string;
            "NO_DATA": string;
            "UNAUTHORIZED": string;
            "FORBIDDEN": string;
            "CONNECTION": string;
            "SERVICE_UNAVAILABLE": string;
            "CONNECTION_RESET": string;
            "TIMEOUT": string;
            "SERVER_ERROR": string;
            "CONFLICT": string;
            "VALIDATION_ERROR": {
                "FIELD": string;
                "MISSING": string;
                "FORMAT": string;
                "RANGE": string;
                "DEFAULT": string;
                "UNEXPECTED": string;
                "UNEXPECTED_MESSAGE": string;
            };
        };
        GENERAL_MESSAGES: {
            "LOADING": string;
            "ACTION_SUCCESS": string;
            "ACTION_ERROR": string;
            "RETRY": string;
            "LOADING_DATA": string;
            "RETRY_ACTION": string;
            "REFRESH_DATA": string;
            "ACTION_FAILED": string;
            "NO_RESULTS_FOUND": string;
        };
        FETCH: {
            "SUCCESS": string;
            "EMPTY": string;
            "PARTIAL_SUCCESS": string;
            "ERROR": string;
            "UNAUTHORIZED": string;
            "NOT_FOUND": string;
            "VALIDATION_ERROR": string;
        };
        GENERAL: {
            "LOADING": string;
            "RETRY": string;
            "REFRESH": string;
            "ACTION_FAILED": string;
            "NO_RESULTS": string;
        };
    } | {
        badRequest: string;
        notFound: string;
        invalidId: string;
        unmatch: string;
        notFoundManyData: string;
    } | {
        invalidId: string;
        validateYear: string;
    } | {
        invalidId: string;
        inUsed: string;
        inUsedWithModels: string;
    } | {
        badRequest: string;
        notFound: string;
        invalidId: string;
    } | {
        badRequest: string;
        notFound: string;
        invalidId: string;
    } | {
        NOTFOUND: string;
        PROMOTION_EXIST: string;
        DATE_VALIDATION: string;
        DATE_REQUIRED: string;
        BONUS_REQUIRED: string;
    } | {
        required: string;
        badRequest: string;
        notFound: string;
        invalidIds: string;
        invalidId: string;
    } | {
        badRequest: string;
        notFound: string;
        invalidId: string;
    } | {
        unmatch: string;
    } | {
        unmatch: string;
        prixTTC: string;
        price: string;
        invalid_items: string;
        vat: string;
    } | {
        unmatch: string;
        notFound: string;
    } | {
        generic: string;
    } | {
        unmatch: string;
        tarification: {
            "generic": string;
        };
    } | {
        MINI: string;
    } | {
        PAGINATION: string;
        GENERAL: {
            "badRequest": string;
            "notFound": string;
            "invalidId": string;
            "unmatch": string;
            "notFoundManyData": string;
        };
        FISCAL: {
            "invalidId": string;
            "validateYear": string;
        };
        CATALOGUE: {
            "invalidId": string;
            "inUsed": string;
            "inUsedWithModels": string;
        };
        TVA: {
            "badRequest": string;
            "notFound": string;
            "invalidId": string;
        };
        CUISSON: {
            "badRequest": string;
            "notFound": string;
            "invalidId": string;
        };
        PROMOTION: {
            "NOTFOUND": string;
            "PROMOTION_EXIST": string;
            "DATE_VALIDATION": string;
            "DATE_REQUIRED": string;
            "BONUS_REQUIRED": string;
        };
        TARIFICATION: {
            "required": string;
            "badRequest": string;
            "notFound": string;
            "invalidIds": string;
            "invalidId": string;
        };
        FABRICATION: {
            "badRequest": string;
            "notFound": string;
            "invalidId": string;
        };
        CATEGORIE: {
            "unmatch": string;
        };
        ARTICLE: {
            "unmatch": string;
            "prixTTC": string;
            "price": string;
            "invalid_items": string;
            "vat": string;
        };
        ACCOMPAGNEMENT: {
            "unmatch": string;
            "notFound": string;
        };
        MENU: {
            "unmatch": string;
            "tarification": {
                "generic": string;
            };
        };
        STOCK: {
            "MINI": string;
        };
    };
    lang(): SupportedLang;
}
