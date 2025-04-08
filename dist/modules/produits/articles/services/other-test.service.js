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
var ItemForTestService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemForTestService = void 0;
const common_1 = require("@nestjs/common");
const pipeline_1 = require("src/helpers/pipeline");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const article_entity_1 = require("../entities/article.entity");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const accompagnement_entity_1 = require("../../accompagnements/entities/accompagnement.entity");
const tva_entity_1 = require("src/settings/bases/tva/entities/tva.entity");
const tarrification_entity_1 = require("src/settings/bases/tarrification/entities/tarrification.entity");
const app_helper_service_1 = require("src/helpers/app.helper.service");
const mouvement_entity_1 = require("src/mouvements-stock/mouvement/entities/mouvement.entity");
const store_entity_1 = require("src/stores/entities/store.entity");
let ItemForTestService = ItemForTestService_1 = class ItemForTestService {
    itemModel;
    tvaModel;
    tarifModel;
    accModel;
    mvtModel;
    storeModel;
    pipelineService;
    responseI18nService;
    logger = new common_1.Logger(ItemForTestService_1.name);
    ipAddress = (0, app_helper_service_1.getServerIp)();
    port = process.env.PORT;
    baseUrl = `http://${this.ipAddress}:${this.port}/images/`;
    constructor(itemModel, tvaModel, tarifModel, accModel, mvtModel, storeModel, pipelineService, responseI18nService) {
        this.itemModel = itemModel;
        this.tvaModel = tvaModel;
        this.tarifModel = tarifModel;
        this.accModel = accModel;
        this.mvtModel = mvtModel;
        this.storeModel = storeModel;
        this.pipelineService = pipelineService;
        this.responseI18nService = responseI18nService;
    }
    async itemsTemplate(filterDto) {
        try {
            const { mode, tarificationId, categoryId, storeId } = filterDto;
            const tarificationFilter = tarificationId
                ? new mongoose_1.default.Types.ObjectId(tarificationId)
                : null;
            const storeFilter = categoryId
                ? new mongoose_1.default.Types.ObjectId(storeId)
                : null;
            const filter = {};
            if (filterDto?.itemId) {
                filter._id = new mongoose_1.default.Types.ObjectId(filterDto.itemId);
            }
            if (filterDto?.categoryId) {
                filter.categorie = new mongoose_1.default.Types.ObjectId(filterDto.categoryId);
            }
            if (filterDto?.enable !== undefined) {
                filter.gererStockProduit = filterDto.enable;
            }
            const categoryLookupOptions = {
                let: { categoryId: '$categorie' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$categoryId'],
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            designation: 1,
                            typeFamille: 1,
                            tarification: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: this.tarifModel.collection.name,
                            let: {
                                tarifId: '$tarification',
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $in: ['$_id', '$$tarifId'] },
                                                ...(tarificationFilter
                                                    ? [{ $eq: ['$_id', tarificationFilter] }]
                                                    : []),
                                                ...(mode ? [{ $eq: ['$modeConsommation', mode] }] : []),
                                            ],
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        _id: 1,
                                        designation: 1,
                                        modeConsommation: 1,
                                    },
                                },
                            ],
                            as: 'tarification',
                        },
                    },
                ],
                as: 'categorie',
                preserve: true,
            };
            const tarifLookupOptions = {
                as: 'tarification',
                preserve: true,
                unwind: false,
                let: {
                    tarificationDetails: '$tarification',
                    tarifId: '$tarification.tarificationId',
                    tva: '$tarification.tvaId',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $in: ['$_id', '$$tarifId'] },
                                    ...(tarificationFilter
                                        ? [{ $eq: ['$_id', tarificationFilter] }]
                                        : []),
                                    ...(mode ? [{ $eq: ['$modeConsommation', mode] }] : []),
                                ],
                            },
                        },
                    },
                    {
                        $addFields: {
                            tarificationDetails: {
                                $filter: {
                                    input: '$$tarificationDetails',
                                    as: 'tarif',
                                    cond: { $eq: ['$$tarif.tarificationId', '$_id'] },
                                },
                            },
                        },
                    },
                    {
                        $unwind: {
                            path: '$tarificationDetails',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $addFields: {
                            caisse: '$tarificationDetails.caisse',
                            tva: '$tarificationDetails.tvaId',
                            prixTTC: '$tarificationDetails.prixTTC',
                            prixHT: '$tarificationDetails.prixHT',
                        },
                    },
                    {
                        $lookup: {
                            from: this.tvaModel.collection.name,
                            localField: 'tva',
                            foreignField: '_id',
                            as: 'tva',
                        },
                    },
                    {
                        $unwind: {
                            path: '$tva',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $project: {
                            tarificationDetails: 0,
                            defaultTva: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            'tva.compte_comptable_vente': 0,
                            'tva.compte_comptable_collecte': 0,
                            'tva.createdAt': 0,
                            'tva.updatedAt': 0,
                        },
                    },
                ],
            };
            const fabLookupOptions = {
                as: 'fabrication',
                let: {
                    fabId: '$fabrication.fabricationId',
                    fabricationDetails: '$fabrication',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$_id', '$$fabId'] },
                            stock: true,
                        },
                    },
                    {
                        $addFields: {
                            fabricationDetails: {
                                $filter: {
                                    input: '$$fabricationDetails',
                                    as: 'fab',
                                    cond: { $eq: ['$$fab.fabricationId', '$_id'] },
                                },
                            },
                        },
                    },
                    {
                        $unwind: {
                            path: '$fabricationDetails',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $addFields: {
                            quantite: '$fabricationDetails.quantite',
                            part: '$fabricationDetails.part',
                            stockProduitArticle: '$fabricationDetails.stockProduitArticle',
                        },
                    },
                    {
                        $project: {
                            fabricationDetails: 0,
                        },
                    },
                    {
                        $project: {
                            reference: 0,
                            type: 0,
                            createdAt: 0,
                            updatedAt: 0,
                        },
                    },
                ],
                preserve: true,
                unwind: false,
            };
            const cuissonLookupOptions = {
                let: { cuissonValue: '$cuisson' },
                unwind: false,
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: [true, '$$cuissonValue'] },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            designation: 1,
                            catalogue: {
                                id: '$catalogue.id',
                                image: { $concat: [`${this.baseUrl}`, '$catalogue.image'] },
                            },
                        },
                    },
                ],
                as: 'cuisson',
                preserve: true,
            };
            const addOnsLookupOptions = {
                let: { addOnsId: '$accompagnement' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$_id', '$$addOnsId'] },
                            stock: true,
                        },
                    },
                    {
                        $project: { _id: 1, designation: 1, typeFamille: 1 },
                    },
                    {
                        $lookup: {
                            from: this.accModel.collection.name,
                            let: {
                                parentId: '$_id',
                                tarificationDetails: '$tarification',
                                tarifId: '$tarification.tarificationId',
                                tva: '$tarification.tvaId',
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ['$categorie', '$$parentId'] },
                                        gererStockProduit: true,
                                    },
                                },
                                {
                                    $project: {
                                        _id: 1,
                                        designation: 1,
                                        reference: 1,
                                        catalogue: {
                                            id: '$catalogue.id',
                                            image: {
                                                $concat: [`${this.baseUrl}`, '$catalogue.image'],
                                            },
                                        },
                                        stockMini: 1,
                                        tarification: 1,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: this.tarifModel.collection.name,
                                        let: {
                                            addOnTarifId: '$tarification.tarificationId',
                                            tarificationDetails: '$tarification',
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            { $in: ['$_id', '$$addOnTarifId'] },
                                                            ...(tarificationFilter
                                                                ? [{ $eq: ['$_id', tarificationFilter] }]
                                                                : []),
                                                            ...(mode
                                                                ? [{ $eq: ['$modeConsommation', mode] }]
                                                                : []),
                                                        ],
                                                    },
                                                },
                                            },
                                            {
                                                $addFields: {
                                                    caisse: '$tarificationDetails.caisse',
                                                    prixTTC: '$tarificationDetails.prixTTC',
                                                    prixHT: '$tarificationDetails.prixHT',
                                                },
                                            },
                                            {
                                                $project: {
                                                    _id: 1,
                                                    designation: 1,
                                                    modeConsommation: 1,
                                                    caisse: 1,
                                                    prixTTC: 1,
                                                    prixHT: 1,
                                                },
                                            },
                                        ],
                                        as: 'tarification',
                                    },
                                },
                            ],
                            as: 'data',
                        },
                    },
                ],
                as: 'accompagnement',
                preserve: true,
                unwind: false,
            };
            const uniteLookupOptions = {
                localField: 'unite.uniteId',
                foreignField: '_id',
                as: 'uniteData',
                preserve: true,
            };
            const promotionLookupOptions = {
                preserve: true,
                let: { itemId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$$itemId', '$articles.articleId'],
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            designation: 1,
                            quantite: 1,
                            bonus: 1,
                            articles: {
                                $filter: {
                                    input: '$articles',
                                    as: 'article',
                                    cond: { $eq: ['$$article.articleId', '$$itemId'] },
                                },
                            },
                        },
                    },
                ],
                as: 'promotion',
            };
            const mvtDtsLookupOptions = {
                let: { itemId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$$itemId', '$articleId'] },
                        },
                    },
                    {
                        $lookup: {
                            from: this.mvtModel.collection.name,
                            let: { parentId: '$mouvementId' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$$parentId', '$_id'] },
                                                ...(storeFilter
                                                    ? [{ $eq: ['$storeSource', storeFilter] }]
                                                    : []),
                                            ],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: this.storeModel.collection.name,
                                        let: { storeId: '$storeSource' },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ['$$storeId', '$_id'],
                                                    },
                                                },
                                            },
                                        ],
                                        as: 'store',
                                    },
                                },
                                {
                                    $unwind: {
                                        path: '$store',
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $project: {
                                        _id: 1,
                                        typeMouvement: 1,
                                        storeSource: 1,
                                        store: {
                                            _id: '$store._id',
                                            designation: '$store.designation',
                                            status: '$store.status',
                                        },
                                    },
                                },
                            ],
                            as: 'mvtData',
                        },
                    },
                    {
                        $unwind: {
                            path: '$mvtData',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $group: {
                            _id: {
                                articleId: '$articleId',
                                storeSource: '$mvtData.storeSource',
                            },
                            quantiteTotalEntree: {
                                $sum: {
                                    $cond: [
                                        { $eq: ['$mvtData.typeMouvement', 'ENTREE'] },
                                        '$quantite',
                                        0,
                                    ],
                                },
                            },
                            quantiteTotalSortie: {
                                $sum: {
                                    $cond: [
                                        { $eq: ['$mvtData.typeMouvement', 'SORTIE'] },
                                        '$quantite',
                                        0,
                                    ],
                                },
                            },
                            store: { $first: '$mvtData.store' },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            articleId: '$_id.articleId',
                            store: 1,
                            quantiteTotalEntree: 1,
                            quantiteTotalSortie: 1,
                            quantiteInStock: {
                                $subtract: ['$quantiteTotalEntree', '$quantiteTotalSortie'],
                            },
                        },
                    },
                ],
                as: 'mvtDetailsData',
                preserve: true,
                unwind: false,
            };
            const category = this.pipelineService.categories(categoryLookupOptions);
            const tarif = this.pipelineService.tarifications(tarifLookupOptions);
            const addOns = this.pipelineService.categories(addOnsLookupOptions);
            const cuissons = this.pipelineService.cuissons(cuissonLookupOptions);
            const fabrications = this.pipelineService.fabrications(fabLookupOptions);
            const uniteMesure = this.pipelineService.unites(uniteLookupOptions);
            const promotion = this.pipelineService.promotions(promotionLookupOptions);
            const mvtDtls = this.pipelineService.movementsDetail(mvtDtsLookupOptions);
            const projectItem = {
                $project: {
                    _id: 1,
                    categorie: 1,
                    designation: 1,
                    catalogue: {
                        id: '$catalogue.id',
                        image: { $concat: [`${this.baseUrl}`, '$catalogue.image'] },
                    },
                    tarification: 1,
                    accompagnement: 1,
                    cuisson: 1,
                    gererStockProduit: 1,
                    visibleCaisse: 1,
                    fabrication: 1,
                    articleGeneric: 1,
                    uniteDetails: 1,
                    promotion: 1,
                    quantiteTotalEntree: {
                        $arrayElemAt: ['$mvtDetailsData.quantiteTotalEntree', 0],
                    },
                    quantiteTotalSortie: {
                        $arrayElemAt: ['$mvtDetailsData.quantiteTotalSortie', 0],
                    },
                    quantiteInStock: {
                        $arrayElemAt: ['$mvtDetailsData.quantiteInStock', 0],
                    },
                    store: {
                        $arrayElemAt: ['$mvtDetailsData.store', 0],
                    },
                },
            };
            const pipeline = [
                { $match: filter },
                ...category,
                ...addOns,
                ...fabrications,
                ...cuissons,
                ...uniteMesure,
                ...tarif,
                ...promotion,
                ...mvtDtls,
                projectItem,
            ];
            const results = await this.itemModel.aggregate(pipeline).exec();
            console.log('Items Data: ', JSON.stringify(results, null, 4));
            return this.responseI18nService.fetchAll(results, 'ARTICLE');
        }
        catch (error) {
            this.logger.error('Error fetching items:', error);
            console.error(error);
            throw new Error('Failed to fetch items');
        }
    }
};
exports.ItemForTestService = ItemForTestService;
exports.ItemForTestService = ItemForTestService = ItemForTestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(article_entity_1.Article.name)),
    __param(1, (0, mongoose_2.InjectModel)(tva_entity_1.Tva.name)),
    __param(2, (0, mongoose_2.InjectModel)(tarrification_entity_1.Tarrification.name)),
    __param(3, (0, mongoose_2.InjectModel)(accompagnement_entity_1.Accompagnement.name)),
    __param(4, (0, mongoose_2.InjectModel)(mouvement_entity_1.Mouvement.name)),
    __param(5, (0, mongoose_2.InjectModel)(store_entity_1.Store.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model, typeof (_a = typeof pipeline_1.PipelineService !== "undefined" && pipeline_1.PipelineService) === "function" ? _a : Object, typeof (_b = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _b : Object])
], ItemForTestService);
//# sourceMappingURL=other-test.service.js.map