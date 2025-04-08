"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ResponseHelpersService = void 0;
const common_1 = require("@nestjs/common");
const page_meta_dto_1 = require("../page-meta-dto/page-meta-dto");
let ResponseHelpersService = class ResponseHelpersService {
    success(data, message) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: message || 'Success',
            data,
        };
    }
    fetchWithPagination(data, itemCount, pageOptionsDto, message) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: message || 'Operation successful',
            data,
            meta: new page_meta_dto_1.PageMetaDto({
                pageOptionsDto,
                itemCount,
            }),
        };
    }
    create(data, message) {
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: message || 'Created Successfully',
            data,
        };
    }
    error(message, errors) {
        return {
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message,
            errors,
        };
    }
    notFound(message) {
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: message || 'Not Found',
        };
    }
    conflict(message) {
        return {
            statusCode: common_1.HttpStatus.CONFLICT,
            message: message || 'Conflict',
        };
    }
    pagination(data, total, limit = 10, page = 0, pageSize) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Success',
            data: {
                content: data,
                total,
                limit,
                page,
                pageSize,
            },
        };
    }
    update(data, message) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: message || 'Updated Successfully',
            data,
        };
    }
    delete(data, message) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: message || 'Deleted Successfully',
            data,
        };
    }
    badRequest(message) {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: message || 'Bad Request',
        };
    }
    handleError = (error) => {
        if (error.name === 'ValidationError') {
            throw new common_1.HttpException(`Validation error: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
        if (error.code === 11000) {
            const keyValue = error.keyValue || {};
            const field = Object.keys(keyValue).join(', ') || 'unknown field';
            const value = Object.values(keyValue).join(', ') || 'unknown value';
            throw new common_1.HttpException(`The field '${field}' with value '${value}' already exists.`, common_1.HttpStatus.CONFLICT);
        }
        if (error.status === common_1.HttpStatus.NOT_FOUND ||
            error.message?.includes('not found')) {
            throw new common_1.HttpException(error.message || 'The requested resource was not found.', common_1.HttpStatus.NOT_FOUND);
        }
        if (error.name === 'MongoNetworkError' ||
            error.name === 'MongoTimeoutError') {
            throw new common_1.HttpException('Failed to connect to the database. Please try again later.', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            throw new common_1.HttpException(`Invalid ID format: ${error.value}. Please provide a valid ID.`, common_1.HttpStatus.BAD_REQUEST);
        }
        if (error.status === common_1.HttpStatus.UNAUTHORIZED) {
            throw new common_1.HttpException(error.message || 'You are not authorized to perform this action.', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (error.status === common_1.HttpStatus.FORBIDDEN) {
            throw new common_1.HttpException(error.message || 'You do not have permission to perform this action.', common_1.HttpStatus.FORBIDDEN);
        }
        throw new common_1.HttpException(`${error.message || 'No error message provided'}`, error?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    };
};
exports.ResponseHelpersService = ResponseHelpersService;
exports.ResponseHelpersService = ResponseHelpersService = __decorate([
    (0, common_1.Injectable)()
], ResponseHelpersService);
const handleError = (error) => {
    if (error.name === 'ValidationError') {
        throw new common_1.HttpException(`Validation error: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
    }
    if (error.code === 11000) {
        const keyValue = error.keyValue || {};
        const field = Object.keys(keyValue).join(', ') || 'unknown field';
        const value = Object.values(keyValue).join(', ') || 'unknown value';
        throw new common_1.HttpException(`The field '${field}' with value '${value}' already exists.`, common_1.HttpStatus.CONFLICT);
    }
    if (error.status === common_1.HttpStatus.NOT_FOUND ||
        error.message?.includes('not found')) {
        throw new common_1.HttpException(error.message || 'The requested resource was not found.', common_1.HttpStatus.NOT_FOUND);
    }
    if (error.name === 'MongoNetworkError' ||
        error.name === 'MongoTimeoutError') {
        throw new common_1.HttpException('Failed to connect to the database. Please try again later.', common_1.HttpStatus.SERVICE_UNAVAILABLE);
    }
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new common_1.HttpException(`Invalid ID format: ${error.value}. Please provide a valid ID.`, common_1.HttpStatus.BAD_REQUEST);
    }
    if (error.status === common_1.HttpStatus.UNAUTHORIZED) {
        throw new common_1.HttpException(error.message || 'You are not authorized to perform this action.', common_1.HttpStatus.UNAUTHORIZED);
    }
    if (error.status === common_1.HttpStatus.FORBIDDEN) {
        throw new common_1.HttpException(error.message || 'You do not have permission to perform this action.', common_1.HttpStatus.FORBIDDEN);
    }
    throw new common_1.HttpException(`An unexpected error occurred: ${error.message || 'No error message provided'}`, error?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
};
exports.handleError = handleError;
//# sourceMappingURL=response-helpers.service.js.map