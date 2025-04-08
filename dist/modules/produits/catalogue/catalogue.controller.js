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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const catalogue_service_1 = require("./catalogue.service");
const create_catalogue_dto_1 = require("./dto/create-catalogue.dto");
const update_catalogue_dto_1 = require("./dto/update-catalogue.dto");
const platform_express_1 = require("@nestjs/platform-express");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const app_constants_1 = require("src/app.constants");
const file_upload_validate_1 = require("src/helpers/file-upload-validate/file-upload-validate");
const crud = app_constants_1.ApiConstants.crud('catalog');
const deleteMore = app_constants_1.ApiConstants.crud('The information required to delete an image from the catalogue');
let CatalogueController = class CatalogueController {
    catalogueService;
    constructor(catalogueService) {
        this.catalogueService = catalogueService;
    }
    async create(createCatalogueDto, files) {
        return this.catalogueService.create(createCatalogueDto, files);
    }
    async addImageToAutreImage(id, otherImageDto, files) {
        return this.catalogueService.addImageToOtherImage(id, otherImageDto, files);
    }
    findAll(pageOptionsDto) {
        return this.catalogueService.findAll(pageOptionsDto);
    }
    async getDropdownForCategory() {
        return await this.catalogueService.dropDownForCatalogue();
    }
    findOne(id) {
        return this.catalogueService.findOne(id);
    }
    async update(id, updateCatalogueDto, files) {
        return await this.catalogueService.update(id, updateCatalogueDto, files);
    }
    remove(id) {
        return this.catalogueService.remove(id);
    }
    async deleteImageFromOtherImage(id, imageToRemove) {
        const result = await this.catalogueService.deleteImageFromOtherImage(id, imageToRemove);
        return result;
    }
};
exports.CatalogueController = CatalogueController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: crud.create.summary }),
    (0, swagger_1.ApiBody)({
        type: create_catalogue_dto_1.CreateCatalogueDto,
        description: crud.create.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: crud.create.response201 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.create.response400 }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 5, file_upload_validate_1.multerOptions)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_catalogue_dto_1.CreateCatalogueDto, Array]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('add-image/list/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new image to the images array' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: create_catalogue_dto_1.OtherImageDto,
        description: 'The information required to add an additional image to the catalogue',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 20, file_upload_validate_1.multerOptions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_catalogue_dto_1.OtherImageDto, Array]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "addImageToAutreImage", null);
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
], CatalogueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dropdown'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a dropdown list of catalogues' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "getDropdownForCategory", null);
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
], CatalogueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: crud.update.summary }),
    (0, swagger_1.ApiBody)({
        type: update_catalogue_dto_1.UpdateCatalogueDto,
        description: crud.update.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: crud.update.response200 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.update.response400 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.update.response404 }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, file_upload_validate_1.multerOptions)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_catalogue_dto_1.UpdateCatalogueDto, Array]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.remove.summary }),
    (0, swagger_1.ApiResponse)({ status: 204, description: crud.remove.response204 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.remove.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogueController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-image/:id'),
    (0, swagger_1.ApiOperation)({ summary: crud.remove.summary }),
    (0, swagger_1.ApiResponse)({ status: 204, description: crud.remove.response204 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.remove.response404 }),
    (0, swagger_1.ApiBody)({
        type: create_catalogue_dto_1.DeleteImageDto,
        description: deleteMore.description,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_catalogue_dto_1.DeleteImageDto]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "deleteImageFromOtherImage", null);
exports.CatalogueController = CatalogueController = __decorate([
    (0, swagger_1.ApiTags)('Gestion catalogue'),
    (0, common_1.Controller)('catalogue'),
    __metadata("design:paramtypes", [catalogue_service_1.CatalogueService])
], CatalogueController);
//# sourceMappingURL=catalogue.controller.js.map