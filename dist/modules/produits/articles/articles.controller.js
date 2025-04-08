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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const filter_dto_1 = require("src/common/filter/filter.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
let ArticlesController = class ArticlesController {
    articlesService;
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    create(createArticleDto) {
        const article = this.articlesService.create(createArticleDto);
        return article;
    }
    findAll(pageOptionsDto, filterStockDto, filterCategoryDto) {
        return this.articlesService.findAll(filterStockDto, filterCategoryDto, pageOptionsDto);
    }
    findItemsByStore(stock) {
        return this.articlesService.findItemsByStore(stock);
    }
    dropDownCategoryItems(stock) {
        return this.articlesService.dropDownCategoryItems(stock);
    }
    findOne(id) {
        return this.articlesService.findOne(id);
    }
    async update(id, updateArticleDto) {
        const updatedArticle = this.articlesService.update(id, updateArticleDto);
        return updatedArticle;
    }
    remove(id) {
        return this.articlesService.remove(id);
    }
};
exports.ArticlesController = ArticlesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new article' }),
    (0, swagger_1.ApiBody)({
        type: create_article_dto_1.CreateArticleDto,
        description: 'Details of the article to be created',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all articles' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof page_options_dto_1.PageOptionsDto !== "undefined" && page_options_dto_1.PageOptionsDto) === "function" ? _a : Object, typeof (_b = typeof filter_dto_1.FilterStockDto !== "undefined" && filter_dto_1.FilterStockDto) === "function" ? _b : Object, typeof (_c = typeof filter_dto_1.FilterCategoryDto !== "undefined" && filter_dto_1.FilterCategoryDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get items by store' }),
    (0, common_1.Get)('items-store'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof filter_dto_1.FilterStoreDto !== "undefined" && filter_dto_1.FilterStoreDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findItemsByStore", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all items by category' }),
    (0, common_1.Get)('category-item'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof filter_dto_1.FilterStockDto !== "undefined" && filter_dto_1.FilterStockDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "dropDownCategoryItems", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific article by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing article' }),
    (0, swagger_1.ApiBody)({
        type: update_article_dto_1.UpdateArticleDto,
        description: 'Details of the article to be updated',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete an articles' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "remove", null);
exports.ArticlesController = ArticlesController = __decorate([
    (0, swagger_2.ApiTags)('Gestion articles'),
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesController);
//# sourceMappingURL=articles.controller.js.map