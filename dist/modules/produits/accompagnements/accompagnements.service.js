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
var AccompagnementsService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccompagnementsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const accompagnement_entity_1 = require("./entities/accompagnement.entity");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
const fabrication_service_1 = require("../fabrication/fabrication.service");
const catalogue_service_1 = require("../catalogue/catalogue.service");
const catalogue_entity_1 = require("../catalogue/entities/catalogue.entity");
const categories_service_1 = require("../categories/categories.service");
const category_entity_1 = require("../categories/entities/category.entity");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const fabrication_entity_1 = require("../fabrication/entities/fabrication.entity");
const tarrification_entity_1 = require("src/settings/bases/tarrification/entities/tarrification.entity");
const tva_entity_1 = require("src/settings/bases/tva/entities/tva.entity");
const tarrification_service_1 = require("src/settings/bases/tarrification/tarrification.service");
const app_helper_service_1 = require("src/helpers/app.helper.service");
const tva_service_1 = require("src/settings/bases/tva/tva.service");
let AccompagnementsService = AccompagnementsService_1 = class AccompagnementsService {
    addOnModel;
    referenceService;
    tarificationService;
    categoriesService;
    catalogueService;
    fabricationService;
    tvaService;
    responseI18nService;
    appHelperService;
    logger = new common_1.Logger(AccompagnementsService_1.name);
    constructor(addOnModel, referenceService, tarificationService, categoriesService, catalogueService, fabricationService, tvaService, responseI18nService, appHelperService) {
        this.addOnModel = addOnModel;
        this.referenceService = referenceService;
        this.tarificationService = tarificationService;
        this.categoriesService = categoriesService;
        this.catalogueService = catalogueService;
        this.fabricationService = fabricationService;
        this.tvaService = tvaService;
        this.responseI18nService = responseI18nService;
        this.appHelperService = appHelperService;
    }
    async create(dataDto) {
        try {
            const validatedData = await this.beforeCreateOrUpdate(dataDto);
            const addOn = await this.addOnModel.create(validatedData);
            return this.responseI18nService.create(addOn, 'ACCOMPAGNEMENT');
        }
        catch (error) {
            this.logger.error('Error creating add-ons', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findAll(filterStockDto, pageOptionsDto) {
        try {
            const { take, skip, order, search } = pageOptionsDto;
            if (skip < 0 || (take && take < 1)) {
                throw this.responseI18nService.badRequest('PAGINATION');
            }
            const filter = {};
            if (search) {
                filter.$or = [{ designation: { $regex: search, $options: 'i' } }];
            }
            if (filterStockDto.enable === true) {
                filter.gererStockProduit = true;
            }
            else if (filterStockDto.enable === false) {
                filter.gererStockProduit = false;
            }
            else {
                filter.gererStockProduit = { $ne: null };
            }
            const query = this.addOnModel
                .find(filter)
                .populate([
                {
                    path: 'categorie',
                    model: category_entity_1.Category.name,
                    select: '_id designation',
                },
                { path: 'catalogue', model: catalogue_entity_1.Catalogue.name },
                { path: 'tarification.tarificationId', model: tarrification_entity_1.Tarrification.name },
                {
                    path: 'tarification.tvaId',
                    model: tva_entity_1.Tva.name,
                    select: '_id designation',
                },
                {
                    path: 'fabrication.fabricationId',
                    model: fabrication_entity_1.Fabrication.name,
                },
            ])
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take);
            const [results, itemCount] = await Promise.all([
                query.lean().exec(),
                this.addOnModel.countDocuments(filter),
            ]);
            const formattedData = await Promise.all(results.map((results) => this.formatAddonsData(results)));
            return this.responseI18nService.fetchWithPagination(formattedData, itemCount, pageOptionsDto, 'ACCOMPAGNEMENT');
        }
        catch (error) {
            console.error('Error fetching addons:', error.message, error.stack);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const query = await this.addOnModel
                .findOne({ _id: id })
                .populate([{ path: 'categorie', model: category_entity_1.Category.name }])
                .lean();
            if (!query) {
                return this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
            }
            const formatData = this.appHelperService.singleImageUrl([query])[0];
            return this.responseI18nService.success(formatData, 'ACCOMPAGNEMENT');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, dataDto) {
        try {
            const existingData = await this.addOnModel.findById(id);
            if (!existingData) {
                throw this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
            }
            const validatedData = await this.beforeCreateOrUpdate(dataDto, true);
            const updated = await this.addOnModel.findByIdAndUpdate(id, validatedData, { new: true });
            const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(updated.toObject());
            return this.responseI18nService.update(formatData, 'ACCOMPAGNEMENT');
        }
        catch (error) {
            this.logger.error('Error updating add-ons', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.addOnModel.findByIdAndDelete(id);
            if (deleted) {
                return this.responseI18nService.success(deleted, 'ACCOMPAGNEMENT');
            }
            else {
                return this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
            }
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async validateAccompagnements(accompagnements) {
        if (!Array.isArray(accompagnements) || accompagnements.length === 0) {
            return [];
        }
        const accompagnementsIds = accompagnements
            .map((id) => id.trim())
            .filter((id) => mongoose_2.default.isValidObjectId(id));
        if (accompagnementsIds.length === 0) {
            throw this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
        }
        const existingAccompagnements = await this.addOnModel.find({
            _id: {
                $in: accompagnementsIds.map((id) => new mongoose_2.default.Types.ObjectId(id)),
            },
        });
        if (existingAccompagnements.length !== accompagnementsIds.length) {
            const existingIds = existingAccompagnements.map((item) => item._id.toString());
            const missingIds = accompagnementsIds.filter((id) => !existingIds.includes(id));
            this.logger.error(`Les accompagnements suivants sont introuvables : ${missingIds.join(', ')}`);
            throw this.responseI18nService.badRequest('ACCOMPAGNEMENT.notFound');
        }
        return existingAccompagnements;
    }
    async beforeCreateOrUpdate(dataDto, isUpdate = false) {
        const fabrication = Array.isArray(dataDto.fabrication)
            ? dataDto.fabrication
            : [];
        try {
            const [reference, category, catalogue, validateFabrications, validateTarifications,] = await Promise.all([
                isUpdate
                    ? null
                    : this.referenceService.generateReferenceNumber('ACC', 6),
                this.categoriesService.findOne(dataDto.categorie),
                this.catalogueService.findOne(dataDto.catalogue.id),
                this.fabricationService.validateMultipleFabrications(fabrication),
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
            if (category.data.typeFamille !== enumerations_enum_1.CategorieType.ACCOMPAGNEMENT) {
                throw this.responseI18nService.badRequest('ACCOMPAGNEMENT.unmatch');
            }
            if (dataDto.gererStockProduit && dataDto.stockMini <= 0) {
                throw this.responseI18nService.badRequest('STOCK.MINI');
            }
            return {
                ...dataDto,
                reference: isUpdate ? dataDto.reference : reference,
                categorie: category.data._id,
                catalogue: catalog,
                fabrication: validateFabrications,
                tarification: validateTarifications,
            };
        }
        catch (error) {
            this.logger.error('Error in validation before create/update', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async formatAddonsData(article) {
        if (!article)
            return null;
        const addOns = this.appHelperService.singleImageUrl([article])[0];
        if (addOns.tarification && addOns.tarification.length) {
            addOns.tarification = await Promise.all(addOns.tarification.map(async (tarif) => {
                if (!tarif.tarificationId) {
                    console.warn('tarificationId is missing', tarif);
                    return null;
                }
                const [tarifData, tvaData] = await Promise.all([
                    this.tarificationService.findOne(tarif.tarificationId),
                    tarif.tvaId ? this.tvaService.findOne(tarif.tvaId) : null,
                ]);
                return {
                    _id: tarifData?.data?._id ?? null,
                    designation: tarifData?.data?.designation ?? null,
                    consumptionMode: tarifData?.data?.modeConsommation ?? null,
                    tva: tvaData?.data
                        ? {
                            _id: tvaData?.data?._id ?? null,
                            designation: tvaData?.data?.designation ?? null,
                        }
                        : null,
                    caisse: tarif?.caisse ?? null,
                    prixTTC: tarif?.prixTTC ?? null,
                    prixHT: tarif?.prixHT ?? null,
                };
            })).then((res) => res.filter(Boolean));
        }
        else {
            addOns.tarification = [];
        }
        return addOns;
    }
};
exports.AccompagnementsService = AccompagnementsService;
exports.AccompagnementsService = AccompagnementsService = AccompagnementsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(accompagnement_entity_1.Accompagnement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _a : Object, typeof (_b = typeof tarrification_service_1.TarrificationService !== "undefined" && tarrification_service_1.TarrificationService) === "function" ? _b : Object, categories_service_1.CategoriesService,
        catalogue_service_1.CatalogueService,
        fabrication_service_1.FabricationService, typeof (_c = typeof tva_service_1.TvaService !== "undefined" && tva_service_1.TvaService) === "function" ? _c : Object, typeof (_d = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _d : Object, typeof (_e = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _e : Object])
], AccompagnementsService);
//# sourceMappingURL=accompagnements.service.js.map