"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const multer_1 = require("multer");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (exception.code === 'ENOENT') {
            this.logger.error(`File Not Found: ${exception.path} | Method: ${request.method} | URL: ${request.url}`);
            return response.status(404).json({
                statusCode: 404,
                message: 'Requested file not found.',
                timestamp: new Date().toISOString(),
            });
        }
        if (exception instanceof multer_1.MulterError) {
            this.logger.error(`File Upload Error: ${exception.message} | Method: ${request.method} | URL: ${request.url}`);
            return response.status(400).json({
                statusCode: 400,
                message: `File upload error: ${exception.message}`,
                timestamp: new Date().toISOString(),
            });
        }
        if (exception instanceof common_1.BadRequestException) {
            const status = exception.getStatus();
            const message = this.getMessage(exception);
            this.logger.error(`Status: ${status} | Method: ${request.method} | URL: ${request.url} | Error: ${message}`, exception.stack);
            return response.status(status).json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
            });
        }
        if (exception instanceof mongoose_1.MongooseError) {
            this.logger.error(`Mongoose Error: ${exception.message} | Method: ${request.method} | URL: ${request.url}`);
            return response.status(400).json({
                statusCode: 400,
                message: 'Database error occurred.',
                timestamp: new Date().toISOString(),
            });
        }
        const status = exception.getStatus ? exception.getStatus() : 500;
        const message = this.getMessage(exception);
        this.logger.error(`Status: ${status} | Method: ${request.method} | URL: ${request.url} | Error: ${message}`, exception.stack);
        return response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
    getMessage(exception) {
        const response = exception.getResponse
            ? exception.getResponse()
            : 'An unexpected error occurred.';
        if (typeof response === 'string') {
            return response;
        }
        if (typeof response === 'object' && response['message']) {
            return Array.isArray(response['message'])
                ? response['message'].join(', ')
                : response['message'];
        }
        return 'An unexpected error occurred.';
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=custom.exception.js.map