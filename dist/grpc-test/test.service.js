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
var GrpcTestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcTestService = void 0;
const common_1 = require("@nestjs/common");
let GrpcTestService = GrpcTestService_1 = class GrpcTestService {
    client;
    logger = new common_1.Logger(GrpcTestService_1.name);
    fiscalYearService;
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.fiscalYearService =
            this.client.getService('ParameterService');
        console.log('External Grpc Api service Initialized');
    }
    async getFiscalYearData(_id) {
        const response = await this.fiscalYearService
            .getFiscalYear({ _id })
            .toPromise();
        console.log('Fetched fiscal year:', response);
        return response;
    }
};
exports.GrpcTestService = GrpcTestService;
exports.GrpcTestService = GrpcTestService = GrpcTestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PARAMETER_SERVICE_PACKAGE')),
    __metadata("design:paramtypes", [Object])
], GrpcTestService);
//# sourceMappingURL=test.service.js.map