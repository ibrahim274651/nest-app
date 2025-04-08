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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcTestController = void 0;
const app_constants_1 = require("@/app.constants");
const external_grpc_api_service_1 = require("@/grpc/external-grpc-api.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud = app_constants_1.ApiConstants.crud('Fiscal Year');
let GrpcTestController = class GrpcTestController {
    externalGrpcApiService;
    constructor(externalGrpcApiService) {
        this.externalGrpcApiService = externalGrpcApiService;
    }
    async getFiscalYear(id) {
        return this.externalGrpcApiService.checkFiscalYearExists(id);
    }
};
exports.GrpcTestController = GrpcTestController;
__decorate([
    (0, common_1.Get)('fiscal-year/:id'),
    (0, swagger_1.ApiOperation)({ summary: crud.findOne.summary }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findOne.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: crud.findOne.response404,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GrpcTestController.prototype, "getFiscalYear", null);
exports.GrpcTestController = GrpcTestController = __decorate([
    (0, swagger_1.ApiTags)('Test for Grpc'),
    (0, common_1.Controller)('grpc-test'),
    __metadata("design:paramtypes", [typeof (_a = typeof external_grpc_api_service_1.ExternalGrpcApiService !== "undefined" && external_grpc_api_service_1.ExternalGrpcApiService) === "function" ? _a : Object])
], GrpcTestController);
//# sourceMappingURL=test.controller.js.map