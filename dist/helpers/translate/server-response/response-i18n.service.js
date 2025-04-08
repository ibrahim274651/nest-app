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
const page_meta_dto_1 = require("@/helpers/page-meta-dto/page-meta-dto");
let ResponseI18nService = class ResponseI18nService {
    i18nService;
    message;
    defaultMessage;
    constructor(i18nService) {
        this.i18nService = i18nService;
    }
    translateMessage(key, args = {}) {
        return this.i18nService.translate(key, { args });
    }
    translateOtherMessage(key, args = {}) {
        return this.i18nService.translate(`otherMessage.${String(key)}`, {
            args,
        });
    }
    translateEntity(key) {
        return this.translateMessage(`collection.ENTITY.${String(key)}`);
    }
    translateField(key) {
        return this.translateMessage(`collection.FIELD.${String(key)}`);
    }
    success(data, entityKey) {
        this.message = this.translateMessage('global.CRUD.READ.SUCCESS', {
            entity: this.translateEntity(entityKey),
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: this.message || 'Operation successful',
            data,
        };
    }
    fetchWithPagination(data, itemCount, pageOptionsDto, entityKey) {
        const hasData = data && data.length > 0;
        this.message = hasData
            ? this.translateMessage('global.CRUD.READ.SUCCESS', {
                entity: this.translateEntity(entityKey),
            })
            : this.translateMessage('global.CRUD.READ.NOT_FOUND', {
                entity: this.translateEntity(entityKey),
            }) || 'No data available';
        return {
            statusCode: hasData ? common_1.HttpStatus.OK : common_1.HttpStatus.NO_CONTENT,
            message: this.message || 'Data fetched successfully',
            data,
            meta: new page_meta_dto_1.PageMetaDto({
                pageOptionsDto,
                itemCount,
            }),
        };
    }
    fetchAll(data, entityKey) {
        const hasData = data && data.length > 0;
        const count = hasData ? data.length : 0;
        this.message = hasData
            ? this.translateMessage('global.CRUD.READ.SUCCESS', {
                entity: this.translateEntity(entityKey),
            })
            : this.translateMessage('global.CRUD.READ.NOT_FOUND', {
                entity: this.translateEntity(entityKey),
            }) || 'No data available';
        return {
            statusCode: hasData ? common_1.HttpStatus.OK : common_1.HttpStatus.NO_CONTENT,
            message: this.message,
            count,
            data: hasData ? data : [],
        };
    }
    create(data, entityKey) {
        this.message = this.translateMessage('global.CRUD.CREATE.SUCCESS', {
            entity: this.translateEntity(entityKey),
        });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: this.message || 'Entity created successfully',
            data,
        };
    }
    update(data, entityKey) {
        this.message = this.i18nService.translate('global.CRUD.UPDATE.SUCCESS', {
            args: { entity: entityKey },
        });
        this.message = this.translateMessage('global.CRUD.UPDATE.SUCCESS', {
            entity: this.translateEntity(entityKey),
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: this.message || 'Entity updated successfully',
            data,
        };
    }
    delete(data, entityKey) {
        this.message = this.translateMessage('global.CRUD.DELETE.SUCCESS', {
            entity: this.translateEntity(entityKey),
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: this.message || 'Entity deleted successfully',
            data,
        };
    }
    notFound() {
        this.message = this.translateMessage('global.ERRORS.NOT_FOUND');
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: this.message || 'Resource not found',
            timestamp: new Date().toISOString(),
        };
    }
    notFoundData(entityKey) {
        this.message = this.translateMessage('global.ERRORS.INVALID_DATA', {
            entity: this.translateEntity(entityKey),
        });
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: this.message || 'Resource not found',
            data: null,
            timestamp: new Date().toISOString(),
        };
    }
    conflict(field, value) {
        this.message = this.translateMessage('global.ERRORS.CONFLICT', {
            args: { field, value },
        });
        return {
            statusCode: common_1.HttpStatus.CONFLICT,
            message: this.message || 'Conflict occurred',
            timestamp: new Date().toISOString(),
        };
    }
    validationError({ key, fieldName }) {
        this.message = this.translateMessage(`global.ERRORS.VALIDATION_ERROR.${String(key)}`, {
            field: this.translateField(fieldName),
        });
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: this.message || 'Invalid input',
        };
    }
    otherMessage(key, args = {}) {
        return this.translateOtherMessage(key, args);
    }
    async badRequest(key, args) {
        this.message = this.translateOtherMessage(key, { args });
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: this.message,
            timestamp: new Date().toISOString(),
        };
    }
    handleError = (error) => {
        if (error.name === 'ValidationError') {
            this.message = this.translateMessage('global.ERRORS.VALIDATION_ERROR', {
                message: error.message || 'Validation error occurred.',
            });
            throw new common_1.HttpException(this.message || 'Validation error occurred.', common_1.HttpStatus.BAD_REQUEST);
        }
        if (error.code === 11000) {
            const keyValue = error.keyValue || {};
            const field = Object.keys(keyValue).join(', ') || 'unknown field';
            const value = Object.values(keyValue).join(', ') || 'unknown value';
            this.message = this.translateMessage('global.ERRORS.CONFLICT', {
                field: this.translateField(field),
                value,
            });
            throw new common_1.HttpException(this.message || 'Conflict', common_1.HttpStatus.CONFLICT);
        }
        if (error.status === common_1.HttpStatus.NOT_FOUND ||
            error.message?.includes('not found')) {
            const entityName = error.entity || 'Resource';
            this.message = this.translateMessage('global.ERRORS.INVALID_DATA', {
                entity: entityName,
            });
            throw new common_1.HttpException(this.message || `${entityName} not found.`, common_1.HttpStatus.NOT_FOUND);
        }
        if (error.code === 'ECONNRESET') {
            this.message = this.translateMessage('global.ERRORS.CONNECTION_RESET', {});
            throw new common_1.HttpException(this.message || 'The connection was reset. Please try again.', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        if (error.status === common_1.HttpStatus.SERVICE_UNAVAILABLE) {
            this.message = this.translateMessage('global.ERRORS.SERVICE_UNAVAILABLE', {});
            throw new common_1.HttpException(this.message ||
                'The service is temporarily unavailable. Please try again later.', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        if (error.name === 'MongoNetworkError' ||
            error.name === 'MongoTimeoutError') {
            this.message = this.translateMessage('global.ERRORS.CONNECTION', {});
            throw new common_1.HttpException(this.message || 'Database connection error. Please try again later.', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            this.message = this.translateMessage('global.ERRORS.INVALID_ID', {
                id: error.value,
            });
            throw new common_1.HttpException(this.message || 'Invalid ID format.', common_1.HttpStatus.BAD_REQUEST);
        }
        if (error.status === common_1.HttpStatus.UNAUTHORIZED) {
            this.message = this.translateMessage('global.ERRORS.UNAUTHORIZED', {});
            throw new common_1.HttpException(this.message || 'Unauthorized access.', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (error.status === common_1.HttpStatus.FORBIDDEN) {
            this.message = this.translateMessage('global.ERRORS.FORBIDDEN');
            throw new common_1.HttpException(this.message || 'Forbidden access.', common_1.HttpStatus.FORBIDDEN);
        }
        this.defaultMessage = this.translateMessage('global.ERRORS.VALIDATION_ERROR.UNEXPECTED', {
            message: error.message || 'No error message provided',
        });
        throw new common_1.HttpException(this.defaultMessage || 'An unexpected error occurred.', error?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    };
};
exports.ResponseI18nService = ResponseI18nService;
exports.ResponseI18nService = ResponseI18nService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [translate_service_1.TranslateService])
], ResponseI18nService);
//# sourceMappingURL=response-i18n.service.js.map