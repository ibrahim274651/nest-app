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
var CuissonsService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuissonsService = void 0;
const common_1 = require("@nestjs/common");
const cuisson_entity_1 = require("./entities/cuisson.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const catalogue_service_1 = require("../catalogue/catalogue.service");
const app_helper_service_1 = require("src/helpers/app.helper.service");
const catalogue_entity_1 = require("../catalogue/entities/catalogue.entity");
let CuissonsService = CuissonsService_1 = class CuissonsService {
    cuissonModel;
    catalogueService;
    appHelperService;
    responseI18nService;
    logger = new common_1.Logger(CuissonsService_1.name);
    constructor(cuissonModel, catalogueService, appHelperService, responseI18nService) {
        this.cuissonModel = cuissonModel;
        this.catalogueService = catalogueService;
        this.appHelperService = appHelperService;
        this.responseI18nService = responseI18nService;
    }
    async beforeCreateOrUpdate(dto) {
        if (!dto) {
            throw this.responseI18nService.badRequest('CUISSON');
        }
        const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
            catalogue: dto.catalogue,
        }).catalogue;
        const updatedDto = {
            ...dto,
            catalogue: catalog,
        };
        this.logger.debug('Constructed final DTO:', updatedDto);
        return updatedDto;
    }
    async create(dto) {
        try {
            const formatData = await this.beforeCreateOrUpdate(dto);
            const created = await this.cuissonModel.create(formatData);
            return this.responseI18nService.create(this.appHelperService.mapCatalogResponseWithImageUrl(created.toObject()), 'CUISSON');
        }
        catch (error) {
            this.logger.error('Error creating cuisson:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async findAll(pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        try {
            const filter = {};
            if (search) {
                filter.designation = { $regex: search, $options: 'i' };
            }
            const results = await this.cuissonModel
                .find(filter)
                .populate([
                {
                    path: 'catalogue.id',
                    model: catalogue_entity_1.Catalogue.name,
                    select: '_id designation',
                },
            ])
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take)
                .lean()
                .exec();
            const itemCount = await this.cuissonModel.countDocuments(filter);
            const formattedData = await Promise.all(results.map((results) => this.formatCuissonData(results)));
            return this.responseI18nService.fetchWithPagination(formattedData, itemCount, pageOptionsDto, 'CUISSON');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async getDropdown() {
        try {
            const data = await this.cuissonModel
                .find()
                .populate([
                {
                    path: 'catalogue.id',
                    model: catalogue_entity_1.Catalogue.name,
                    select: '_id designation',
                },
            ])
                .lean()
                .exec();
            const formatData = this.appHelperService.singleImageUrl(data);
            return this.responseI18nService.success(formatData, 'CUISSON');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const data = await this.cuissonModel
                .findById(id)
                .populate([
                {
                    path: 'catalogue.id',
                    model: catalogue_entity_1.Catalogue.name,
                    select: '_id designation',
                },
            ])
                .lean()
                .exec();
            if (!data) {
                return this.responseI18nService.notFound();
            }
            const formatData = this.appHelperService.singleImageUrl([data])[0];
            return this.responseI18nService.success(formatData, 'CUISSON');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, updateDto) {
        try {
            const existingData = await this.cuissonModel.findById(id);
            if (!existingData) {
                return this.responseI18nService.notFoundData('CUISSON');
            }
            if (updateDto.catalogue) {
                const catalog = await this.beforeCreateOrUpdate(updateDto);
                updateDto.catalogue = catalog.catalogue;
            }
            const updated = await this.cuissonModel
                .findByIdAndUpdate(id, updateDto, { new: true })
                .exec();
            const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(updated.toObject());
            return this.responseI18nService.update(formatData, 'CUISSON');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.cuissonModel.findByIdAndDelete(id).exec();
            if (!deleted) {
                return this.responseI18nService.notFound();
            }
            return this.responseI18nService.delete(deleted, 'CUISSON');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async formatCuissonData(result) {
        if (!result)
            return null;
        return this.appHelperService.singleImageUrl([result])[0];
    }
};
exports.CuissonsService = CuissonsService;
exports.CuissonsService = CuissonsService = CuissonsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cuisson_entity_1.Cuisson.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        catalogue_service_1.CatalogueService, typeof (_a = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _a : Object, typeof (_b = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _b : Object])
], CuissonsService);
//# sourceMappingURL=cuissons.service.js.map