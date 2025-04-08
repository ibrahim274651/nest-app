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
var MenusService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const menu_entity_1 = require("./entities/menu.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
const catalogue_entity_1 = require("../catalogue/entities/catalogue.entity");
const catalogue_service_1 = require("../catalogue/catalogue.service");
const categories_service_1 = require("../categories/categories.service");
const category_entity_1 = require("../categories/entities/category.entity");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const tarrification_service_1 = require("src/settings/bases/tarrification/tarrification.service");
const tarrification_entity_1 = require("src/settings/bases/tarrification/entities/tarrification.entity");
const tva_entity_1 = require("src/settings/bases/tva/entities/tva.entity");
const app_helper_service_1 = require("src/helpers/app.helper.service");
let MenusService = MenusService_1 = class MenusService {
    menuModel;
    categoriesService;
    catalogueService;
    appHelperService;
    responseI18nService;
    tarificationService;
    logger = new common_1.Logger(MenusService_1.name);
    constructor(menuModel, categoriesService, catalogueService, appHelperService, responseI18nService, tarificationService) {
        this.menuModel = menuModel;
        this.categoriesService = categoriesService;
        this.catalogueService = catalogueService;
        this.appHelperService = appHelperService;
        this.responseI18nService = responseI18nService;
        this.tarificationService = tarificationService;
    }
    async beforeCreateOrUpdate(dataDto, isUpdate = false) {
        try {
            const [reference, category, catalogue, validateFabrications] = await Promise.all([
                isUpdate
                    ? null
                    : this.appHelperService.generateReferenceNumber('ART', 6),
                this.categoriesService.findOne(dataDto.categorie),
                this.catalogueService.findOne(dataDto.catalogue.id),
                this.tarificationService.validateMultipleTvasAndTarifications(dataDto.tarification),
            ]);
            const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
                catalogue: dataDto.catalogue,
            }).catalogue;
            if (!catalogue?.data?._id) {
                throw this.responseI18nService.notFoundData('CATALOGUE');
            }
            if (!category?.data?._id) {
                throw this.responseI18nService.notFoundData('CATEGORY');
            }
            if (category.data.typeFamille !== enumerations_enum_1.CategorieType.MENU) {
                throw this.responseI18nService.otherMessage('MENU.unmatch');
            }
            return {
                ...dataDto,
                designation: dataDto.designation,
                reference: isUpdate ? dataDto.reference : reference,
                categorie: category.data._id,
                catalogue: catalog,
                fabrication: validateFabrications,
            };
        }
        catch (error) {
            this.logger.error('Error in validation before create/update', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async create(dataDto) {
        try {
            if (dataDto.articleGeneric === false) {
                if (dataDto.tarification) {
                    const invalidTarification = dataDto.tarification.some((item) => item.prixHT > item.prixTTC);
                    if (invalidTarification) {
                        return this.responseI18nService.badRequest('MENU.tarification.generic');
                    }
                }
            }
            const validatedData = await this.beforeCreateOrUpdate(dataDto);
            const created = await this.menuModel.create(validatedData);
            const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(created.toObject());
            return this.responseI18nService.create(formatData, 'MENU');
        }
        catch (error) {
            this.logger.error('Error creating menu', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findAll(filterFundDto, pageOptionsDto) {
        try {
            const { take, skip, order, search } = pageOptionsDto;
            if (skip < 0 || (take && take < 1)) {
                throw this.responseI18nService.badRequest('PAGINATION');
            }
            const filter = this.constructFilter(filterFundDto);
            const query = this.buildQuery(filter, order, skip, take);
            const results = await query.lean().exec();
            const filteredResults = this.filterResults(results, search);
            const paginatedResults = filteredResults.slice(skip, skip + take);
            return this.responseI18nService.fetchWithPagination(paginatedResults, filteredResults.length, pageOptionsDto, 'MENU');
        }
        catch (error) {
            console.error('Error fetching addons:', error.message, error.stack);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const query = await this.menuModel
                .findOne({ _id: id })
                .populate([{ path: 'categorie', model: category_entity_1.Category.name }])
                .lean();
            if (!query) {
                return this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
            }
            return this.responseI18nService.success(query, 'ACCOMPAGNEMENT');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, updateMenuDto) {
        try {
            const existingData = await this.menuModel.findById(id);
            if (!existingData) {
                throw this.responseI18nService.notFoundData('MENU');
            }
            const validatedData = await this.beforeCreateOrUpdate(updateMenuDto, true);
            const updated = await this.menuModel.findByIdAndUpdate({ _id: id }, validatedData, { new: true });
            const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(updated.toObject());
            return this.responseI18nService.success(formatData, 'MENU');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.menuModel.findByIdAndDelete(id);
            if (deleted) {
                return this.responseI18nService.success(deleted, 'MENU');
            }
            else {
                return this.responseI18nService.notFoundData('MENU');
            }
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    buildQuery(filter, order, skip, take) {
        return this.menuModel
            .find(filter)
            .populate([
            { path: 'categorie', model: category_entity_1.Category.name, select: '_id designation' },
            { path: 'catalogue', model: catalogue_entity_1.Catalogue.name, select: '_id designation' },
            {
                path: 'tarification.tarificationId',
                model: tarrification_entity_1.Tarrification.name,
                select: '_id designation',
            },
            {
                path: 'tarification.tvaId',
                model: tva_entity_1.Tva.name,
                select: '_id designation',
            },
        ])
            .sort({ createdAt: order === 'DESC' ? -1 : 1 })
            .skip(skip)
            .limit(take);
    }
    constructFilter(filterFundDto) {
        if (filterFundDto.enable === true) {
            return { visibleCaisse: true };
        }
        else if (filterFundDto.enable === false) {
            return { visibleCaisse: false };
        }
        return { visibleCaisse: { $ne: null } };
    }
    filterResults(results, search) {
        const formattedData = this.appHelperService.singleImageUrl(results);
        return formattedData.filter((item) => {
            if (!item.categorie ||
                !item.catalogue ||
                !item.reference ||
                !item.designation)
                return false;
            const { categorie, catalogue, reference, designation } = item;
            return (categorie.designation.match(new RegExp(search, 'i')) ||
                catalogue.designation.match(new RegExp(search, 'i')) ||
                reference.match(new RegExp(search, 'i')) ||
                designation.match(new RegExp(search, 'i')));
        });
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = MenusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(menu_entity_1.Menu.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        categories_service_1.CategoriesService,
        catalogue_service_1.CatalogueService, typeof (_a = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _a : Object, typeof (_b = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _b : Object, typeof (_c = typeof tarrification_service_1.TarrificationService !== "undefined" && tarrification_service_1.TarrificationService) === "function" ? _c : Object])
], MenusService);
//# sourceMappingURL=menus.service.js.map