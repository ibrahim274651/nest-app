"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseI18nService = void 0;
const common_1 = require("@nestjs/common");
const translate_service_1 = require("../translate.service");
const page_meta_dto_1 = require("../../page-meta-dto/page-meta-dto");
const ERROR_KEYS = {
    NOT_FOUND: 'global.ERRORS.NOT_FOUND',
    INVALID_DATA: 'global.ERRORS.INVALID_DATA',
    CONFLICT: 'global.ERRORS.CONFLICT',
    VALIDATION: 'global.ERRORS.VALIDATION_ERROR',
    UNEXPECTED: 'global.ERRORS.VALIDATION_ERROR.UNEXPECTED',
    CONNECTION: 'global.ERRORS.CONNECTION',
    CONNECTION_RESET: 'global.ERRORS.CONNECTION_RESET',
    UNAUTHORIZED: 'global.ERRORS.UNAUTHORIZED',
    FORBIDDEN: 'global.ERRORS.FORBIDDEN',
    SERVICE_UNAVAILABLE: 'global.ERRORS.SERVICE_UNAVAILABLE',
    INVALID_ID: 'global.ERRORS.INVALID_ID',
};
let ResponseI18nService = class ResponseI18nService {
    i18n;
    constructor(i18n) {
        this.i18n = i18n;
    }
    translate(key, args = {}) {
        return this.i18n.translate(key, { args });
    }
    getTranslatedEntity(key) {
        return this.translate(`collection.ENTITY.${key}`);
    }
    getTranslatedField(key) {
        return this.translate(`collection.FIELD.${key}`);
    }
    getOtherMessage(key, args = {}) {
        return this.translate(`otherMessage.${key}`, { args });
    }
    success(data, entityKey) {
        const entity = this.getTranslatedEntity(entityKey);
        const message = this.translate('global.CRUD.READ.SUCCESS', { entity });
        return { statusCode: common_1.HttpStatus.OK, message, data };
    }
    fetchWithPagination(data, itemCount, pageOptionsDto, entityKey) {
        const hasData = data.length > 0;
        const entity = this.getTranslatedEntity(entityKey);
        const message = this.translate(hasData ? 'global.CRUD.READ.SUCCESS' : 'global.CRUD.READ.NOT_FOUND', { entity });
        return {
            statusCode: hasData ? common_1.HttpStatus.OK : common_1.HttpStatus.NO_CONTENT,
            message: message,
            data,
            meta: new page_meta_dto_1.PageMetaDto({ pageOptionsDto, itemCount }),
        };
    }
    fetchAll(data, entityKey) {
        const hasData = data.length > 0;
        const entity = this.getTranslatedEntity(entityKey);
        const message = this.translate(hasData ? 'global.CRUD.READ.SUCCESS' : 'global.CRUD.READ.NOT_FOUND', { entity });
        return {
            statusCode: hasData ? common_1.HttpStatus.OK : common_1.HttpStatus.NO_CONTENT,
            message,
            count: data.length,
            data: hasData ? data : [],
        };
    }
    create(data, entityKey) {
        const message = this.translate('global.CRUD.CREATE.SUCCESS', {
            entity: this.getTranslatedEntity(entityKey),
        });
        return { statusCode: common_1.HttpStatus.CREATED, message, data };
    }
    update(data, entityKey) {
        const message = this.translate('global.CRUD.UPDATE.SUCCESS', {
            entity: this.getTranslatedEntity(entityKey),
        });
        return { statusCode: common_1.HttpStatus.OK, message, data };
    }
    delete(data, entityKey) {
        const message = this.translate('global.CRUD.DELETE.SUCCESS', {
            entity: this.getTranslatedEntity(entityKey),
        });
        return { statusCode: common_1.HttpStatus.OK, message, data };
    }
    notFound() {
        const message = this.translate(ERROR_KEYS.NOT_FOUND);
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message,
            timestamp: new Date().toISOString(),
        };
    }
    notFoundData(entityKey) {
        const message = this.translate(ERROR_KEYS.INVALID_DATA, {
            entity: this.getTranslatedEntity(entityKey),
        });
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message,
            data: null,
            timestamp: new Date().toISOString(),
        };
    }
    conflict(field, value) {
        const message = this.translate(ERROR_KEYS.CONFLICT, {
            field: this.getTranslatedField(field),
            value,
        });
        return {
            statusCode: common_1.HttpStatus.CONFLICT,
            message,
            timestamp: new Date().toISOString(),
        };
    }
    validationError({ key, fieldName }) {
        const message = this.translate(`global.ERRORS.VALIDATION_ERROR.${key}`, {
            field: this.getTranslatedField(fieldName),
        });
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message,
        };
    }
    badRequest(key, args) {
        const message = this.getOtherMessage(key, args || {});
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message,
            timestamp: new Date().toISOString(),
        };
    }
    handleError = (error) => {
        if (error.name === 'ValidationError') {
            const message = this.translate(ERROR_KEYS.VALIDATION, {
                message: error.message,
            });
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
        if (error.code === 11000) {
            const keyValue = error.keyValue ?? {};
            const entries = Object.entries(keyValue);
            let field = 'field';
            let value = 'value';
            if (entries.length > 0) {
                const [key, val] = entries[0];
                field = key;
                value = typeof val === 'string' ? val : JSON.stringify(val);
            }
            const message = this.translate(ERROR_KEYS.CONFLICT, {
                field: this.getTranslatedField(field),
                value,
            });
            throw new common_1.HttpException(message, common_1.HttpStatus.CONFLICT);
        }
        if (error.status === common_1.HttpStatus.NOT_FOUND ||
            (typeof error.message === 'string' &&
                error.message.toLowerCase().includes('not found'))) {
            const entity = error.entity || 'Resource';
            const message = this.translate(ERROR_KEYS.INVALID_DATA, { entity });
            throw new common_1.HttpException(message, common_1.HttpStatus.NOT_FOUND);
        }
        if (String(error.code) === 'ECONNRESET') {
            const message = this.translate(ERROR_KEYS.CONNECTION_RESET);
            throw new common_1.HttpException(message, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        if (error.status === common_1.HttpStatus.SERVICE_UNAVAILABLE) {
            const message = this.translate(ERROR_KEYS.SERVICE_UNAVAILABLE);
            throw new common_1.HttpException(message, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        if (['MongoNetworkError', 'MongoTimeoutError'].includes(error.name || '')) {
            const message = this.translate(ERROR_KEYS.CONNECTION);
            throw new common_1.HttpException(message, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            const message = this.translate(ERROR_KEYS.INVALID_ID, {
                id: error.value || 'unknown',
            });
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
        if (error.status === common_1.HttpStatus.UNAUTHORIZED) {
            const message = this.translate(ERROR_KEYS.UNAUTHORIZED);
            throw new common_1.HttpException(message, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (error.status === common_1.HttpStatus.FORBIDDEN) {
            const message = this.translate(ERROR_KEYS.FORBIDDEN);
            throw new common_1.HttpException(message, common_1.HttpStatus.FORBIDDEN);
        }
        const message = this.translate(ERROR_KEYS.UNEXPECTED, {
            message: error.message || 'Unknown error occurred',
        });
        throw new common_1.HttpException(message, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    };
};
exports.ResponseI18nService = ResponseI18nService;
exports.ResponseI18nService = ResponseI18nService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [translate_service_1.TranslateService])
], ResponseI18nService);
//# sourceMappingURL=response-i18n.service.js.map