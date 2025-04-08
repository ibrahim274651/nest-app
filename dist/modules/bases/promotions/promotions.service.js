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
var PromotionsService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsService = void 0;
const common_1 = require("@nestjs/common");
const promotion_entity_1 = require("./entities/promotion.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pipeline_service_1 = require("src/helpers/pipeline/pipeline.service");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const article_entity_1 = require("src/settings/produits/articles/entities/article.entity");
let PromotionsService = PromotionsService_1 = class PromotionsService {
    promotionModel;
    pipelineService;
    responseI18nService;
    logger = new common_1.Logger(PromotionsService_1.name);
    constructor(promotionModel, pipelineService, responseI18nService) {
        this.promotionModel = promotionModel;
        this.pipelineService = pipelineService;
        this.responseI18nService = responseI18nService;
    }
    async create(dataDto) {
        const articles = Array.isArray(dataDto.articles) ? dataDto.articles : [];
        try {
            let promotion;
            if (dataDto.periodeIllimite) {
                promotion = await this.promotionModel.create({
                    designation: dataDto.designation,
                    quantite: dataDto.quantite,
                    articles: articles,
                    periodeIllimite: true,
                });
            }
            else {
                promotion = await this.promotionModel.create({ ...dataDto, articles });
            }
            return this.responseI18nService.create(promotion, 'PROMOTION');
        }
        catch (error) {
            this.logger.error(error);
            throw this.handleCreateError(error);
        }
    }
    async findAll(pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        try {
            const filter = {};
            if (search) {
                filter.designation = { $regex: search, $options: 'i' };
            }
            const results = await this.promotionModel
                .find(filter)
                .populate([
                {
                    path: 'articles.articleId',
                    model: article_entity_1.Article.name,
                    select: 'reference designation tarification',
                },
            ])
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take)
                .lean()
                .exec();
            const filteredResults = this.filterResults(results, search);
            const paginatedResults = filteredResults.slice(skip, skip + take);
            return this.responseI18nService.fetchWithPagination(paginatedResults, filteredResults.length, pageOptionsDto, 'PROMOTION');
        }
        catch (error) {
            this.logger.error('Error fetching promotion:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findItemsWhichHasPromotion(pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        try {
            const matchStage = {};
            if (search) {
                matchStage.designation = { $regex: search, $options: 'i' };
            }
            const articleLookupOptions = {
                localField: 'articles.articleId',
                foreignField: '_id',
                as: 'articleDetails',
            };
            const tarificationLookupOptions = {
                localField: 'tarification.tarificationId',
                foreignField: '_id',
                as: 'tarificationDetails',
            };
            const tvaLookupOptions = {
                localField: 'tarificationDetails.tvaId',
                foreignField: '_id',
                as: 'tvaDetails',
            };
            const projectStage = {
                $project: {
                    _id: 1,
                    designation: 1,
                    articles: {
                        articleId: '$articleDetails',
                        achat: '$articles.achat',
                        offert: '$articles.offert',
                    },
                },
            };
            const sortStage = {
                $sort: { createdAt: order === 'DESC' ? -1 : 1 },
            };
            const paginationStages = [
                { $skip: skip },
                { $limit: take },
            ];
            const pipeline = [
                { $match: matchStage },
                ...this.pipelineService.articles(articleLookupOptions),
                { $unwind: '$articles' },
                ...this.pipelineService.tarifications(tarificationLookupOptions),
                ...this.pipelineService.tvas(tvaLookupOptions),
                { $unwind: '$articleDetails' },
                sortStage,
                ...paginationStages,
                projectStage,
            ];
            const results = await this.promotionModel.aggregate(pipeline).exec();
            const itemCount = await this.promotionModel.countDocuments(matchStage);
            return this.responseI18nService.fetchWithPagination(results, itemCount, pageOptionsDto, 'PROMOTION');
        }
        catch (error) {
            this.logger.error('Error fetching promotion:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const query = await this.promotionModel.findOne({ _id: id });
            if (!query) {
                return this.responseI18nService.notFoundData('PROMOTION');
            }
            return this.responseI18nService.success(query, 'PROMOTION');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, updatePromotionDto) {
        try {
            const updateResult = await this.promotionModel.findByIdAndUpdate(id, updatePromotionDto, { new: true });
            return this.responseI18nService.update(updateResult, 'PROMOTION');
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.promotionModel.findByIdAndDelete(id);
            if (deleted) {
                return this.responseI18nService.delete(deleted, 'PROMOTION');
            }
            else {
                return this.responseI18nService.notFoundData('PROMOTION');
            }
        }
        catch (error) {
            throw this.responseI18nService.handleError(error);
        }
    }
    filterResults(results, search) {
        const regex = new RegExp(search, 'i');
        return results.filter((item) => {
            if (!item.articles || !item.designation)
                return false;
            return (item.articles.some((article) => {
                const { articleId } = article;
                if (articleId &&
                    typeof articleId._id === 'string' &&
                    typeof articleId.designation === 'string') {
                    return (articleId._id.match(regex) || articleId.designation.match(regex));
                }
                return false;
            }) || item.designation.match(regex));
        });
    }
    handleCreateError(error) {
        const errorMappings = {
            DATE_VALIDATION: 'PROMOTION.DATE_VALIDATION',
            BONUS_REQUIRED: 'PROMOTION.BONUS_REQUIRED',
            DATE_REQUIRED: 'PROMOTION.DATE_REQUIRED',
        };
        const conflictErrors = {
            PROMOTION_EXIST: 'PROMOTION.PROMOTION_EXIST',
        };
        if (conflictErrors[error.message]) {
            throw this.responseI18nService.badRequest(conflictErrors[error]);
        }
        if (errorMappings[error]) {
            throw this.responseI18nService.badRequest(errorMappings[error]);
        }
        this.logger.error(error);
        throw this.responseI18nService.handleError(error);
    }
};
exports.PromotionsService = PromotionsService;
exports.PromotionsService = PromotionsService = PromotionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(promotion_entity_1.Promotion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof pipeline_service_1.PipelineService !== "undefined" && pipeline_service_1.PipelineService) === "function" ? _a : Object, typeof (_b = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _b : Object])
], PromotionsService);
//# sourceMappingURL=promotions.service.js.map