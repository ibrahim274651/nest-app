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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const swagger_1 = require("@nestjs/swagger");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const app_constants_1 = require("src/app.constants");
const filter_dto_1 = require("src/common/filter/filter.dto");
const crud = app_constants_1.ApiConstants.crud('category');
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto) {
        console.log('DTO:', createCategoryDto);
        return this.categoriesService.create(createCategoryDto);
    }
    findAll(pageOptionsDto) {
        return this.categoriesService.findAll(pageOptionsDto);
    }
    async getDropdownForCategory(typeFamille, stock) {
        return await this.categoriesService.getdropDownForCategory(typeFamille, stock);
    }
    async getCategoryByMode(stock, filter) {
        console.log('filter DTO:', filter);
        console.log('stock DTO:', stock);
        return await this.categoriesService.getCategoryByTarif(filter, stock);
    }
    findOne(id) {
        return this.categoriesService.findOne(id);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: crud.create.summary }),
    (0, swagger_1.ApiBody)({
        type: create_category_dto_1.CreateCategoryDto,
        description: crud.create.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: crud.create.response201 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.create.response400 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: crud.findAll.summary }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findAll.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: crud.findAll.response400,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof page_options_dto_1.PageOptionsDto !== "undefined" && page_options_dto_1.PageOptionsDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dropdown-image'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the dropdown list of categories (filter based on famille and stock) optional',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findAll.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: crud.findAll.response400,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof filter_dto_1.FilterTypeCategoryDto !== "undefined" && filter_dto_1.FilterTypeCategoryDto) === "function" ? _b : Object, typeof (_c = typeof filter_dto_1.FilterStockDto !== "undefined" && filter_dto_1.FilterStockDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getDropdownForCategory", null);
__decorate([
    (0, common_1.Get)('type-mode'),
    (0, swagger_1.ApiOperation)({ summary: 'Get categories base on consumption mode' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findAll.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: crud.findAll.response400,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof filter_dto_1.FilterStockDto !== "undefined" && filter_dto_1.FilterStockDto) === "function" ? _d : Object, typeof (_e = typeof filter_dto_1.FilterConsumptionModeDto !== "undefined" && filter_dto_1.FilterConsumptionModeDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryByMode", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.findOne.summary }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findOne.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: crud.findOne.response404,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.update.summary }),
    (0, swagger_1.ApiBody)({
        type: update_category_dto_1.UpdateCategoryDto,
        description: crud.update.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: crud.update.response200 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.update.response400 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.update.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.remove.summary }),
    (0, swagger_1.ApiResponse)({ status: 204, description: crud.remove.response204 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.remove.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Gestion categorie'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map