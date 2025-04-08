"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MonitoringInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
let MonitoringInterceptor = MonitoringInterceptor_1 = class MonitoringInterceptor {
    logger = new common_1.Logger(MonitoringInterceptor_1.name);
    intercept(context, next) {
        if (context.getType() === 'http') {
            return this.logHttpCall(context, next);
        }
        return next.handle();
    }
    logHttpCall(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, user, ip } = request;
        const userAgent = request.get('user-agent') || 'Unknown';
        const correlationKey = (0, uuid_1.v4)();
        const userId = user?.userId || 'Anonymous';
        const logPrefix = `[${correlationKey}]`;
        this.logger.log(`${logPrefix} Incoming Request: ${method} ${url} | User: ${userId} | User-Agent: ${userAgent} | IP: ${ip}`);
        const start = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            const response = context.switchToHttp().getResponse();
            const statusCode = response.statusCode;
            const contentLength = response.get('content-length') || 'Unknown';
            const duration = Date.now() - start;
            this.logger.log(`${logPrefix} Response: ${method} ${url} | Status: ${statusCode} | Content-Length: ${contentLength} | Duration: ${duration}ms`);
        }));
    }
};
exports.MonitoringInterceptor = MonitoringInterceptor;
exports.MonitoringInterceptor = MonitoringInterceptor = MonitoringInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], MonitoringInterceptor);
//# sourceMappingURL=monitoring.interceptor.js.map