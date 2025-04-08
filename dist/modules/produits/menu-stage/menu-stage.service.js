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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuStageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const menu_stage_entity_1 = require("./entities/menu-stage.entity");
const mongoose_2 = require("mongoose");
const catalogue_service_1 = require("../catalogue/catalogue.service");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const verification_service_1 = require("src/verification.service");
let MenuStageService = class MenuStageService {
    menuStageModel;
    verificationService;
    responseI18nService;
    logger = new common_1.Logger(catalogue_service_1.CatalogueService.name);
    constructor(menuStageModel, verificationService, responseI18nService) {
        this.menuStageModel = menuStageModel;
        this.verificationService = verificationService;
        this.responseI18nService = responseI18nService;
    }
    async create(createMenuStageDto) {
        try {
            const created = await this.menuStageModel.create(createMenuStageDto);
            return this.responseI18nService.create(created, 'MENU_STAGE');
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
            const results = await this.menuStageModel
                .find(filter)
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take)
                .lean()
                .exec();
            const itemCount = await this.menuStageModel.countDocuments(filter);
            return this.responseI18nService.fetchWithPagination(results, itemCount, pageOptionsDto, 'MENU_STAGE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async dropDownForMenuOption() {
        try {
            const results = await this.menuStageModel.find().lean().exec();
            return this.responseI18nService.success(results, 'MENU_STAGE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const catalogue = await this.menuStageModel.findById(id);
            if (!catalogue) {
                return this.responseI18nService.notFoundData('MENU_STAGE');
            }
            return this.responseI18nService.success(catalogue, 'MENU_STAGE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, updateMenuStageDto) {
        try {
            const catalogue = await this.menuStageModel.findById(id);
            if (!catalogue) {
                return this.responseI18nService.notFoundData('MENU_STAGE');
            }
            const query = await this.menuStageModel.findByIdAndUpdate({ _id: id }, updateMenuStageDto);
            return this.responseI18nService.update(query, 'MENU_STAGE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const n = await this.verificationService.isMenuStageUsed(id);
            console.log('Niveau:', n);
            const catalogue = await this.menuStageModel.findById(id);
            if (!catalogue) {
                return this.responseI18nService.notFoundData('MENU_STAGE');
            }
            const deleted = await this.menuStageModel.findByIdAndDelete(id);
            return this.responseI18nService.delete(deleted, 'MENU_STAGE');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
};
exports.MenuStageService = MenuStageService;
exports.MenuStageService = MenuStageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(menu_stage_entity_1.MenuStage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _a : Object, typeof (_b = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _b : Object])
], MenuStageService);
//# sourceMappingURL=menu-stage.service.js.map