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
var UniteMesureService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniteMesureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const unite_mesure_entity_1 = require("./entities/unite-mesure.entity");
const mongoose_2 = require("mongoose");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const verification_service_1 = require("src/verification.service");
let UniteMesureService = UniteMesureService_1 = class UniteMesureService {
    uniteMesureModel;
    verificationService;
    responseI18nService;
    logger = new common_1.Logger(UniteMesureService_1.name);
    constructor(uniteMesureModel, verificationService, responseI18nService) {
        this.uniteMesureModel = uniteMesureModel;
        this.verificationService = verificationService;
        this.responseI18nService = responseI18nService;
    }
    async create(createUniteMesureDto) {
        try {
            const uniteMesure = await this.uniteMesureModel.create(createUniteMesureDto);
            return this.responseI18nService.create(uniteMesure, 'UNITE_MESURE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findAll(pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        try {
            const filter = {};
            if (search) {
                filter.designation = { $regex: search, $options: 'i' };
            }
            const results = await this.uniteMesureModel
                .find(filter)
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take)
                .lean()
                .exec();
            const itemCount = await this.uniteMesureModel.countDocuments(filter);
            return this.responseI18nService.fetchWithPagination(results, itemCount, pageOptionsDto, 'UNITE_MESURE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async dropDownForUniteMesure() {
        try {
            const uniteMesure = await this.uniteMesureModel
                .find()
                .sort({ designation: 1 })
                .lean();
            return this.responseI18nService.success(uniteMesure, 'UNITE_MESURE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const unite = await this.uniteMesureModel.findById(id).exec();
            if (!unite) {
                return this.responseI18nService.notFound();
            }
            return this.responseI18nService.success(unite, 'UNITE_MESURE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, UpdateUniteMesureDto) {
        try {
            const updated = await this.uniteMesureModel
                .findByIdAndUpdate(id, UpdateUniteMesureDto, { new: true })
                .exec();
            if (!updated) {
                return this.responseI18nService.notFound();
            }
            return this.responseI18nService.update(updated, 'UNITE_MESURE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            await this.verificationService.isUniteUsed(id);
            const deleted = await this.uniteMesureModel.findByIdAndDelete(id).exec();
            if (!deleted) {
                return this.responseI18nService.notFound();
            }
            return this.responseI18nService.delete(deleted, 'UNITE_MESURE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
};
exports.UniteMesureService = UniteMesureService;
exports.UniteMesureService = UniteMesureService = UniteMesureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(unite_mesure_entity_1.UniteMesure.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _a : Object, typeof (_b = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _b : Object])
], UniteMesureService);
//# sourceMappingURL=unite-mesure.service.js.map