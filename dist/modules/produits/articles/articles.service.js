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
var ArticlesService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const article_entity_1 = require("./entities/article.entity");
const mongoose_2 = require("mongoose");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
const fabrication_service_1 = require("../fabrication/fabrication.service");
const catalogue_entity_1 = require("../catalogue/entities/catalogue.entity");
const catalogue_service_1 = require("../catalogue/catalogue.service");
const category_entity_1 = require("../categories/entities/category.entity");
const categories_service_1 = require("../categories/categories.service");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const app_helper_service_1 = require("src/helpers/app.helper.service");
const tarrification_service_1 = require("src/modules/bases/tarrification/tarrification.service");
const tva_service_1 = require("src/modules/bases/tva/tva.service");
const verification_service_1 = require("src/modules/verification.service");
const fabrication_entity_1 = require("../fabrication/entities/fabrication.entity");
const unite_mesure_entity_1 = require("../unite-mesure/entities/unite-mesure.entity");
let ArticlesService = ArticlesService_1 = class ArticlesService {
    itemModel;
    categoriesService;
    catalogueService;
    fabricationService;
    responseI18nService;
    tarificationService;
    tvaService;
    verificationService;
    appHelperService;
    logger = new common_1.Logger(ArticlesService_1.name);
    constructor(itemModel, categoriesService, catalogueService, fabricationService, responseI18nService, tarificationService, tvaService, verificationService, appHelperService) {
        this.itemModel = itemModel;
        this.categoriesService = categoriesService;
        this.catalogueService = catalogueService;
        this.fabricationService = fabricationService;
        this.responseI18nService = responseI18nService;
        this.tarificationService = tarificationService;
        this.tvaService = tvaService;
        this.verificationService = verificationService;
        this.appHelperService = appHelperService;
    }
    async beforeCreateOrUpdate(dataDto, isUpdate = false) {
        const fabrication = Array.isArray(dataDto.fabrication)
            ? dataDto.fabrication
            : [];
        try {
            const [reference, category, catalogue, validateFabrications, validateTarifications, validAccompagnements,] = await Promise.all([
                isUpdate
                    ? null
                    : this.appHelperService.generateReferenceNumber('ART', 6),
                this.categoriesService.findOne(dataDto.categorie),
                this.catalogueService.findOne(dataDto.catalogue.id),
                this.fabricationService.validateMultipleFabrications(fabrication),
                this.tarificationService.validateMultipleTvasAndTarifications(dataDto.tarification),
                this.categoriesService.validateAccompagnements(dataDto.accompagnement),
            ]);
            const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
                catalogue: dataDto.catalogue,
            }).catalogue;
            console.log('CatalogID: ', catalog);
            if (!catalogue?.data?._id) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            if (!category?.data?._id) {
                return this.responseI18nService.notFoundData('CATEGORY');
            }
            if (category.data.typeFamille !== enumerations_enum_1.CategorieType.ARTICLE) {
                return this.responseI18nService.badRequest('ARTICLE.unmatch');
            }
            if (dataDto.gererStockProduit && dataDto.seuilMinimum <= 0) {
                return this.responseI18nService.badRequest('STOCK.MINI');
            }
            return {
                ...dataDto,
                designation: dataDto.designation,
                reference: isUpdate ? dataDto.reference : reference,
                categorie: category.data._id,
                catalogue: catalog,
                fabrication: validateFabrications,
                tarification: validateTarifications,
                accompagnement: validAccompagnements,
            };
        }
        catch (error) {
            this.logger.error('Error in validation before create/update', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async create(dataDto) {
        try {
            const validatedData = await this.beforeCreateOrUpdate(dataDto);
            const created = await this.itemModel.create(validatedData);
            const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(created.toObject());
            return this.responseI18nService.create(formatData, 'ARTICLE');
        }
        catch (error) {
            console.error('Error creating article:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findAll(filterStockDto, category, pageOptionsDto) {
        try {
            const { take, skip, order, search } = pageOptionsDto;
            if (skip < 0 || (take && take < 1)) {
                throw this.responseI18nService.badRequest('PAGINATION');
            }
            const filter = {};
            if (search) {
                filter.$or = [
                    { designation: { $regex: search, $options: 'i' } },
                    { reference: { $regex: search, $options: 'i' } },
                ];
            }
            if (category.categoryId) {
                filter.categorie = category.categoryId;
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
            const query = this.itemModel
                .find(filter)
                .populate([
                {
                    path: 'categorie',
                    model: category_entity_1.Category.name,
                    select: '_id designation',
                },
                {
                    path: 'uniteDetails.unite',
                    model: unite_mesure_entity_1.UniteMesure.name,
                    select: '_id designation symbole',
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
                this.itemModel.countDocuments(filter),
            ]);
            const formattedData = await Promise.all(results.map(async (article) => {
                const formattedArticle = await this.formatItemsData(article);
                return {
                    ...formattedArticle,
                    fabrication: formattedArticle.fabrication?.map((fab) => ({
                        fabricationId: fab.fabricationId
                            ? {
                                _id: fab.fabricationId._id || null,
                                designation: fab.fabricationId.designation || null,
                                quantite: fab.quantite || null,
                                part: fab.part || null,
                                stockProduitArticle: fab.stockProduitArticle || null,
                            }
                            : null,
                    })),
                    unite: formattedArticle.uniteDetails
                        ? {
                            _id: formattedArticle.uniteDetails.unite?._id || null,
                            designation: formattedArticle.uniteDetails.unite?.designation || null,
                            symbole: formattedArticle.uniteDetails.unite?.symbole || null,
                            cond: formattedArticle.uniteDetails.cond || null,
                        }
                        : null,
                    uniteDetails: undefined,
                };
            }));
            return this.responseI18nService.fetchWithPagination(formattedData, itemCount, pageOptionsDto, 'ARTICLE');
        }
        catch (error) {
            this.logger.error('Error fetching articles:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findItemByCategory(categoryId, stock) {
        try {
            const filter = { categorie: categoryId };
            if (stock?.enable !== undefined) {
                filter.gererStockProduit = stock.enable;
            }
            const results = await this.itemModel
                .find(filter)
                .populate([
                { path: 'catalogue', model: catalogue_entity_1.Catalogue.name },
                { path: 'categorie', model: category_entity_1.Category.name },
            ])
                .lean()
                .exec();
            return this.responseI18nService.fetchAll(results, 'ARTICLE');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async dropDownCategoryItems(stock) {
        try {
            const response = await this.categoriesService.categoryDropDown(stock);
            if (!response || !response.data?.length) {
                throw this.responseI18nService.notFoundData('CATEGORY');
            }
            const categories = response.data;
            const data = await Promise.all(categories.map(async (category) => {
                const articles = await this.findItemByCategory(category._id, stock);
                return {
                    _id: category._id,
                    designation: category.designation,
                    typeFamille: category.typeFamille,
                    stock: category.stock,
                    articles: articles.data.map((item) => ({
                        _id: item._id,
                        designation: item.designation,
                        catalogue: item.catalogue,
                    })),
                };
            }));
            return this.responseI18nService.fetchAll(data, 'ARTICLE');
        }
        catch (error) {
            this.logger.error('Error retrieving dropdown data:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.itemModel.findOne({ _id: id }).lean();
            const data = await this.formatItemsData(item);
            return this.responseI18nService.success(data, 'ARTICLE');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOneStockTrue(data) {
        try {
            const { _id, stock } = data;
            const query = await this.itemModel
                .findOne({
                _id: _id,
                gererStockProduit: stock,
            })
                .lean();
            return this.responseI18nService.success(query, 'ARTICLE');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, dataDto) {
        try {
            const existingData = await this.itemModel.findById(id);
            if (!existingData) {
                throw this.responseI18nService.notFoundData('ARTICLE');
            }
            const validatedData = await this.beforeCreateOrUpdate(dataDto, true);
            const updated = await this.itemModel.findByIdAndUpdate(id, validatedData, {
                new: true,
            });
            const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(updated.toObject());
            return this.responseI18nService.update(formatData, 'ARTICLE');
        }
        catch (error) {
            console.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            await this.verificationService.isItemUsed(id);
            const article = await this.itemModel.findById(id);
            if (!article) {
                throw this.responseI18nService.notFoundData('ARTICLE');
            }
            const deleted = await this.itemModel.findByIdAndDelete(id);
            if (deleted) {
                return this.responseI18nService.delete(deleted, 'ARTICLE');
            }
            else {
                throw this.responseI18nService.notFoundData('ARTICLE');
            }
        }
        catch (error) {
            console.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findItemsByStore(store) {
        try {
            const filter = {};
            if (store?.storeId) {
                filter.storeId = store.storeId;
            }
            const results = await this.appService.getMovementData(store);
            const mappedResults = await this.transformResults(results);
            return this.responseI18nService.fetchAll(mappedResults, 'ARTICLE');
        }
        catch (error) {
            this.logger.error('Error fetching promotion:', error);
            console.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async formatItemsData(article) {
        if (!article)
            return null;
        const items = this.appHelperService.singleImageUrl([article])[0];
        if (items.tarification && items.tarification.length) {
            items.tarification = await Promise.all(items.tarification.map(async (tarif) => {
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
            items.tarification = [];
        }
        return items;
    }
    async transformResults(results) {
        const prixTotalByTypeMouvement = {};
        const quantitesByArticle = {};
        return results.map((store) => {
            const transformedStore = {
                ...store,
                store: {
                    ...store.store,
                },
                typeMouvement: store.movements[0]?.typeMouvement,
                typeOperation: store.movements[0]?.typeOperation,
                items: store.movements.flatMap((movement) => movement.mvtDetailsData.map((detail) => {
                    const itemId = detail.itemsData._id.toString();
                    if (!quantitesByArticle[itemId]) {
                        quantitesByArticle[itemId] = {
                            totalEntree: 0,
                            totalSortie: 0,
                            totalQuantite: 0,
                        };
                    }
                    if (movement.typeMouvement === 'ENTREE') {
                        quantitesByArticle[itemId].totalEntree += detail.quantite;
                    }
                    else if (movement.typeMouvement === 'SORTIE') {
                        quantitesByArticle[itemId].totalSortie += detail.quantite;
                    }
                    quantitesByArticle[itemId].totalQuantite =
                        quantitesByArticle[itemId].totalEntree -
                            quantitesByArticle[itemId].totalSortie;
                    return {
                        ...detail.itemsData,
                        quantite: detail.quantite,
                        prixUnitaire: detail.itemsData.tarification.prixTTC,
                        prixTotal: detail.itemsData.tarification.prixTTC * detail.quantite,
                        totalQuantite: quantitesByArticle[itemId].totalQuantite,
                        totalEntree: quantitesByArticle[itemId].totalEntree,
                        totalSortie: quantitesByArticle[itemId].totalSortie,
                        quantitePhysique: quantitesByArticle[itemId].totalQuantite,
                        tarification: {
                            tar_id: detail.itemsData.tarification.tarificationId._id,
                            tar_designation: detail.itemsData.tarification.tarificationId.designation,
                            tar_modeConsommation: detail.itemsData.tarification.tarificationId.modeConsommation,
                            caisse: detail.itemsData.tarification.caisse,
                        },
                    };
                })),
            };
            delete transformedStore.movements;
            const currentTypeMouvement = transformedStore.typeMouvement;
            const totalPrixTotal = transformedStore.items.reduce((sum, item) => sum + item.prixTotal, 0);
            if (prixTotalByTypeMouvement[currentTypeMouvement]) {
                prixTotalByTypeMouvement[currentTypeMouvement] += totalPrixTotal;
            }
            else {
                prixTotalByTypeMouvement[currentTypeMouvement] = totalPrixTotal;
            }
            return {
                results: transformedStore,
                prixTotalByTypeMouvement: prixTotalByTypeMouvement,
            };
        });
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = ArticlesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_entity_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        categories_service_1.CategoriesService,
        catalogue_service_1.CatalogueService,
        fabrication_service_1.FabricationService, typeof (_a = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _a : Object, typeof (_b = typeof tarrification_service_1.TarrificationService !== "undefined" && tarrification_service_1.TarrificationService) === "function" ? _b : Object, typeof (_c = typeof tva_service_1.TvaService !== "undefined" && tva_service_1.TvaService) === "function" ? _c : Object, typeof (_d = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _d : Object, typeof (_e = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _e : Object])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map