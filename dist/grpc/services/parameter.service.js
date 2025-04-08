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
var ParameterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.ParameterService = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = require("moment");
let ParameterService = ParameterService_1 = class ParameterService {
    client;
    logger = new common_1.Logger(ParameterService_1.name);
    fiscalYearService;
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.fiscalYearService =
            this.client.getService('ParameterService');
    }
    async checkFiscalYearExists(_id) {
        try {
            const response = await this.fiscalYearService
                .getFiscalYear({ _id })
                .toPromise();
            if (!response || !response._id) {
                throw new common_1.NotFoundException(exports.MESSAGES.FISCAL.invalidId);
            }
            this.logger.log('Fetched fiscal year:', response);
            return response;
        }
        catch (error) {
            this.logger.error('Error fetching fiscal year:', error.message);
            if (error.code === 5) {
                throw new common_1.NotFoundException(exports.MESSAGES.FISCAL.invalidId);
            }
            throw error;
        }
    }
    validateDateWithinFiscalYear(startDate, endDate, checkDate) {
        const start = (0, moment_1.default)(startDate);
        const end = (0, moment_1.default)(endDate);
        const target = (0, moment_1.default)(checkDate);
        if (!target.isBetween(start, end, undefined, '[]')) {
            const errorMessage = exports.MESSAGES.FISCAL.inUsed
                .replace('{checkDate}', checkDate)
                .replace('{startDate}', startDate)
                .replace('{endDate}', endDate);
            throw new common_1.BadRequestException(errorMessage);
        }
    }
    async getFiscalYearData(_id, checkDate) {
        const fiscalYear = await this.checkFiscalYearExists(_id);
        this.validateDateWithinFiscalYear(fiscalYear.startDate, fiscalYear.endDate, checkDate);
        return fiscalYear;
    }
};
exports.ParameterService = ParameterService;
exports.ParameterService = ParameterService = ParameterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PARAMETER_SERVICE_PACKAGE')),
    __metadata("design:paramtypes", [Object])
], ParameterService);
exports.MESSAGES = {
    FISCAL: {
        invalidId: 'Fiscal year not found. It should be configured first.',
        inUsed: 'The provided date ({checkDate}) is outside the fiscal year range ({startDate} - {endDate}).',
    },
};
//# sourceMappingURL=parameter.service.js.map