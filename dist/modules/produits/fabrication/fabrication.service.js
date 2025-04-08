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
var FabricationService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const fabrication_entity_1 = require("./entities/fabrication.entity");
const mongoose_2 = require("@nestjs/mongoose");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const app_helper_service_1 = require("src/helpers/app.helper.service");
const verification_service_1 = require("src/verification.service");
let FabricationService = FabricationService_1 = class FabricationService {
    fabModel;
    responseI18nService;
    verificationService;
    appHelperService;
    logger = new common_1.Logger(FabricationService_1.name);
    constructor(fabModel, responseI18nService, verificationService, appHelperService) {
        this.fabModel = fabModel;
        this.responseI18nService = responseI18nService;
        this.verificationService = verificationService;
        this.appHelperService = appHelperService;
    }
    async create(dataDto) {
        try {
            if (dataDto.stock) {
                if (dataDto.stockMin <= 0) {
                    throw this.responseI18nService.badRequest('STOCK.MINI');
                }
            }
            const reference = this.appHelperService.generateReferenceNumber('FAB', 6);
            const updatedDto = {
                ...dataDto,
                reference,
            };
            const fabrication = await this.fabModel.create(updatedDto);
            return this.responseI18nService.create(fabrication, 'FABRICATION');
        }
        catch (error) {
            if (error) {
                this.logger.error('Error creating fabrications', error);
                throw this.responseI18nService.handleError(error);
            }
        }
    }
    async findAll(filterStockDto, pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        if (skip < 0 || (take && take < 1)) {
            throw this.responseI18nService.badRequest('PAGINATION');
        }
        const filter = {};
        if (search) {
            filter.designation = { $regex: search, $options: 'i' };
        }
        if (filterStockDto.enable === true) {
            filter.stock = true;
        }
        else if (filterStockDto.enable === false) {
            filter.stock = false;
        }
        else {
            filter.stock = { $ne: null };
        }
        if (search) {
            filter.designation = { $regex: search, $options: 'i' };
        }
        try {
            const query = this.fabModel
                .find(filter)
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take)
                .exec();
            const results = await query;
            const itemCount = await this.fabModel.countDocuments();
            return this.responseI18nService.fetchWithPagination(results, itemCount, pageOptionsDto, 'FABRICATION');
        }
        catch (error) {
            this.logger.error('Error fetching fabrications:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const query = await this.fabModel.findOne({ _id: id }).lean();
            if (!query) {
                return this.responseI18nService.notFoundData('FABRICATION');
            }
            return this.responseI18nService.success(query, 'FABRICATION');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, updateFabricationDto) {
        try {
            const updateResult = await this.fabModel.updateOne({ _id: id }, updateFabricationDto);
            if (updateResult.modifiedCount === 0) {
                return this.responseI18nService.notFoundData('FABRICATION');
            }
            return this.responseI18nService.success(updateResult, 'FABRICATION');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            await this.verificationService.isFabricationUsed(id);
            const deleted = await this.fabModel.findByIdAndDelete(id);
            if (deleted) {
                return this.responseI18nService.success(deleted, 'FABRICATION');
            }
            else {
                return this.responseI18nService.notFoundData('FABRICATION');
            }
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async findFabricationByStatus(filterStockDto) {
        try {
            const query = this.fabModel.find({ stock: filterStockDto.enable });
            const results = await query.lean().exec();
            return this.responseI18nService.success(results, 'FABRICATION');
        }
        catch (error) {
            this.logger.error('Error fetching fabrications:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async validateMultipleFabrications(fabrications) {
        if (!Array.isArray(fabrications)) {
            throw this.responseI18nService.badRequest('FABRICATION.badRequest');
        }
        if (fabrications.length === 0) {
            return [];
        }
        for (const fab of fabrications) {
            const exists = await this.findOne(fab.fabricationId);
            if (!exists || !exists.data?._id) {
                throw this.responseI18nService.notFoundData('FABRICATION');
            }
        }
        const results = await Promise.all(fabrications.map(async (fab) => await this.validateFabrication(fab)));
        const fabId = results.map((item) => item.fabrication._id);
        const fabMixed = fabrications.map((item, index) => ({
            fabricationId: fabId[index].toString(),
            quantite: item.quantite,
            part: item.part,
            stockProduitArticle: item.stockProduitArticle,
        }));
        return fabMixed;
    }
    async validateFabrication(fabrication) {
        if (!fabrication.fabricationId) {
            throw this.responseI18nService.badRequest('FABRICATION.invalidId');
        }
        const foundFabrication = await this.findOne(fabrication.fabricationId);
        return {
            fabrication: foundFabrication.data,
            quantite: fabrication.quantite,
            part: fabrication.part,
            stock: fabrication.stockProduitArticle,
        };
    }
};
exports.FabricationService = FabricationService;
exports.FabricationService = FabricationService = FabricationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(fabrication_entity_1.Fabrication.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, typeof (_a = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _a : Object, typeof (_b = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _b : Object, typeof (_c = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _c : Object])
], FabricationService);
//# sourceMappingURL=fabrication.service.js.map