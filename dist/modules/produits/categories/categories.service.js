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
var CategoriesService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_entity_1 = require("./entities/category.entity");
const mongoose_2 = require("mongoose");
const catalogue_entity_1 = require("../catalogue/entities/catalogue.entity");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const app_helper_service_1 = require("src/helpers/app.helper.service");
const tarrification_service_1 = require("src/modules/bases/tarrification/tarrification.service");
const verification_service_1 = require("src/modules/verification.service");
let CategoriesService = CategoriesService_1 = class CategoriesService {
    categoryDocument;
    tarificationService;
    appHelperService;
    verificationService;
    responseI18nService;
    logger = new common_1.Logger(CategoriesService_1.name);
    constructor(categoryDocument, tarificationService, appHelperService, verificationService, responseI18nService) {
        this.categoryDocument = categoryDocument;
        this.tarificationService = tarificationService;
        this.appHelperService = appHelperService;
        this.verificationService = verificationService;
        this.responseI18nService = responseI18nService;
    }
    async beforeCreateOrUpdate(dto) {
        try {
            if (!dto) {
                throw this.responseI18nService.badRequest('CATEGORIE');
            }
            const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
                catalogue: dto.catalogue,
            }).catalogue;
            const validTarifications = Array.isArray(dto.tarification) && dto.tarification.length > 0
                ? await this.tarificationService.validateTarificationId(dto.tarification)
                : (dto.tarification ?? []);
            const updatedDto = {
                ...dto,
                designation: dto.designation,
                catalogue: catalog,
                tarification: validTarifications,
            };
            this.logger.debug('Constructed final DTO:', updatedDto);
            return updatedDto;
        }
        catch (error) {
            this.logger.error('Error in beforeCreateOrUpdate:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async create(dto) {
        try {
            const categoryData = await this.beforeCreateOrUpdate(dto);
            const category = await this.categoryDocument.create(categoryData);
            return this.responseI18nService.create(this.appHelperService.mapCatalogResponseWithImageUrl(category.toObject()), 'CATEGORY');
        }
        catch (error) {
            this.logger.error('Error creating category:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async findAll(pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        try {
            if (skip < 0 || (take && take < 1)) {
                throw this.responseI18nService.badRequest('PAGINATION');
            }
            const filter = search
                ? { designation: { $regex: search, $options: 'i' } }
                : {};
            const itemCount = await this.categoryDocument.countDocuments(filter);
            const categories = await this.categoryDocument
                .find(filter)
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take ?? 10)
                .lean()
                .exec();
            const formattedData = await Promise.all(categories.map((category) => this.formatCategoryData(category)));
            console.log('formatData:', formattedData);
            return this.responseI18nService.fetchWithPagination(formattedData, itemCount, pageOptionsDto, 'CATEGORY');
        }
        catch (error) {
            this.logger.error(error);
            return this.responseI18nService.handleError(error);
        }
    }
    async getdropDownForCategory(type, stock) {
        try {
            const filter = {};
            if (type?.typeFamille !== undefined) {
                filter.typeFamille = type.typeFamille;
            }
            if (stock?.enable !== undefined) {
                filter.stock = stock.enable;
            }
            const results = await this.categoryDocument
                .find(filter)
                .populate([
                {
                    path: 'catalogue.id',
                    model: catalogue_entity_1.Catalogue.name,
                    select: '_id designation',
                },
            ])
                .lean()
                .select('designation typeFamille catalogue')
                .exec();
            const formatData = this.appHelperService.singleImageUrl(results);
            return this.responseI18nService.fetchAll(formatData, 'CATEGORY');
        }
        catch (error) {
            this.logger.error(error);
            return this.responseI18nService.handleError(error);
        }
    }
    async getCategoryByTarif(filter_mode, stock) {
        try {
            const filter = {};
            if (stock?.enable !== undefined) {
                filter.stock = stock.enable;
            }
            const results = await this.categoryDocument
                .find(filter)
                .populate([
                {
                    path: 'catalogue.id',
                    model: catalogue_entity_1.Catalogue.name,
                    select: '_id designation',
                },
            ])
                .lean()
                .exec();
            console.log('Formatted Data:', JSON.stringify(results, null, 4));
            const formatData = await this.filterResults(results, filter_mode);
            console.log('formatData :', formatData);
            return this.responseI18nService.fetchAll(formatData, 'CATEGORY');
        }
        catch (error) {
            this.logger.error(error);
            console.error(error);
            return this.responseI18nService.handleError(error);
        }
    }
    async categoryDropDown(stock) {
        try {
            const filter = {};
            if (stock?.enable !== undefined) {
                filter.stock = stock.enable;
            }
            const results = await this.categoryDocument
                .find(filter)
                .populate([
                {
                    path: 'catalogue.id',
                    model: catalogue_entity_1.Catalogue.name,
                    select: '_id designation',
                },
            ])
                .lean()
                .exec();
            const formatData = this.appHelperService.singleImageUrl(results);
            return this.responseI18nService.success(formatData, 'CATEGORY');
        }
        catch (error) {
            this.logger.error(error);
            return this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const categorie = await this.categoryDocument.findOne({ _id: id }).lean();
            if (!categorie) {
                throw this.responseI18nService.notFoundData('CATEGORY');
            }
            const formatData = await this.formatCategoryData(categorie);
            return this.responseI18nService.success(formatData, 'CATEGORY');
        }
        catch (error) {
            this.logger.error('Error fetching category:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(categoryId, updateCategoryDto) {
        try {
            const existingCategory = await this.categoryDocument.findById(categoryId);
            if (!existingCategory) {
                return this.responseI18nService.notFoundData('CATEGORY');
            }
            if (updateCategoryDto.catalogue) {
                const catalog = await this.beforeCreateOrUpdate(updateCategoryDto);
                updateCategoryDto.catalogue = catalog.catalogue;
            }
            const updatedCategory = await this.categoryDocument.findByIdAndUpdate(categoryId, updateCategoryDto, { new: true });
            const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(updatedCategory.toObject());
            return this.responseI18nService.update(formatData, 'CATEGORY');
        }
        catch (error) {
            this.logger.error('Error updating category:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.categoryDocument.findByIdAndDelete(id);
            await this.verificationService.isCategoryUsed(id);
            if (deleted) {
                return this.responseI18nService.delete(deleted, 'CATEGORY');
            }
            else {
                throw this.responseI18nService.notFoundData('CATEGORY');
            }
        }
        catch (error) {
            this.logger.error('Error deleting category:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async formatCategoryData(category) {
        if (!category)
            return null;
        const formattedCategory = this.appHelperService.singleImageUrl([
            category,
        ])[0];
        if (formattedCategory.tarification &&
            formattedCategory.tarification.length) {
            const tarifications = await Promise.all(formattedCategory.tarification.map(async (tarifId) => {
                const tarif = await this.tarificationService.findOne(tarifId);
                return tarif?.data
                    ? {
                        _id: tarif.data._id,
                        designation: tarif.data.designation,
                        consumptionMode: tarif.data.modeConsommation,
                    }
                    : null;
            }));
            formattedCategory.tarification = tarifications.filter(Boolean);
        }
        else {
            formattedCategory.tarification = [];
        }
        return formattedCategory;
    }
    async filterResults(results, filter) {
        if (!Array.isArray(results) || results.length === 0)
            return [];
        const formattedResults = await Promise.all(results.map((category) => this.formatCategoryData(category)));
        console.log('Formatted Data:', JSON.stringify(formattedResults, null, 4));
        return formattedResults
            .map((item) => {
            const { tarification } = item;
            if (!filter.mode) {
                return item;
            }
            const dt = tarification?.find((tarif) => tarif.consumptionMode === filter.mode);
            return dt ? { ...item, tarification: dt } : null;
        })
            .filter((item) => item !== null);
    }
    async validateAccompagnements(ids) {
        if (!Array.isArray(ids) || ids.length === 0) {
            return [];
        }
        const categoryIds = ids
            .map((id) => id.trim())
            .filter((id) => mongoose_2.default.isValidObjectId(id));
        if (categoryIds.length === 0) {
            throw this.responseI18nService.notFoundData('CATEGORY');
        }
        const existingCategoryIds = await this.categoryDocument.find({
            _id: {
                $in: ids.map((id) => new mongoose_2.default.Types.ObjectId(id)),
            },
        });
        if (existingCategoryIds.length !== existingCategoryIds.length) {
            const existingIds = existingCategoryIds.map((item) => item._id.toString());
            const missingIds = existingIds.filter((id) => !existingIds.includes(id));
            this.logger.error(`Les categorie suivants de type accompagnements sont introuvables : ${missingIds.join(', ')}`);
            throw this.responseI18nService.badRequest('ACCOMPAGNEMENT.notFound');
        }
        return existingCategoryIds;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = CategoriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof tarrification_service_1.TarrificationService !== "undefined" && tarrification_service_1.TarrificationService) === "function" ? _a : Object, typeof (_b = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _b : Object, typeof (_c = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _c : Object, typeof (_d = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _d : Object])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map