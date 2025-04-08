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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarrificationController = void 0;
const common_1 = require("@nestjs/common");
const tarrification_service_1 = require("./tarrification.service");
const swagger_1 = require("@nestjs/swagger");
const create_tarrification_dto_1 = require("./dto/create-tarrification.dto");
const update_tarrification_dto_1 = require("./dto/update-tarrification.dto");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const app_constants_1 = require("src/app.constants");
const filter_dto_1 = require("src/common/filter/filter.dto");
const crud = app_constants_1.ApiConstants.crud('tarification');
const tarifTva = app_constants_1.ApiConstants.crud('', 'Get each tarification associated with it default tva and all tvas ');
const tarifMode = app_constants_1.ApiConstants.crud('', 'Get tarification based on consomption mode ');
let TarrificationController = class TarrificationController {
    tarificationService;
    constructor(tarificationService) {
        this.tarificationService = tarificationService;
    }
    async create(createTarrificationDto) {
        console.log(createTarrificationDto);
        return this.tarificationService.create(createTarrificationDto);
    }
    async findAll(pageOptionsDto) {
        return this.tarificationService.findAll(pageOptionsDto);
    }
    async getDropdown() {
        return this.tarificationService.findTarrification();
    }
    async findOne(id) {
        return this.tarificationService.findOne(id);
    }
    async findByConsomation(filter) {
        return this.tarificationService.findByConsomation(filter);
    }
    async update(id, updateTarrificationDto) {
        return this.tarificationService.update(id, updateTarrificationDto);
    }
    remove(id) {
        return this.tarificationService.remove(id);
    }
    async getDropdownData() {
        return this.tarificationService.getTarificationAndTvas();
    }
};
exports.TarrificationController = TarrificationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: crud.create.summary }),
    (0, swagger_1.ApiBody)({
        type: create_tarrification_dto_1.CreateTarrificationDto,
        description: crud.create.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: crud.create.response201 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.create.response400 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tarrification_dto_1.CreateTarrificationDto]),
    __metadata("design:returntype", Promise)
], TarrificationController.prototype, "create", null);
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
    __metadata("design:returntype", Promise)
], TarrificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/dropdown/list'),
    (0, swagger_1.ApiOperation)({ summary: crud.findAll.summary_withoutPagination }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findAll.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: crud.findAll.response400,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TarrificationController.prototype, "getDropdown", null);
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
    __metadata("design:returntype", Promise)
], TarrificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('list/consommation'),
    (0, swagger_1.ApiOperation)({ summary: tarifMode.summary }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findAll.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: crud.findAll.response400,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof filter_dto_1.FilterConsumptionModeDto !== "undefined" && filter_dto_1.FilterConsumptionModeDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TarrificationController.prototype, "findByConsomation", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.update.summary }),
    (0, swagger_1.ApiBody)({
        type: update_tarrification_dto_1.UpdateTarrificationDto,
        description: crud.update.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: crud.update.response200 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.update.response400 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.update.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tarrification_dto_1.UpdateTarrificationDto]),
    __metadata("design:returntype", Promise)
], TarrificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.remove.summary }),
    (0, swagger_1.ApiResponse)({ status: 204, description: crud.remove.response204 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.remove.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TarrificationController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/tarif/tvas'),
    (0, swagger_1.ApiOperation)({ summary: tarifTva.summary }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: crud.findAll.response200,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: crud.findAll.response400,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TarrificationController.prototype, "getDropdownData", null);
exports.TarrificationController = TarrificationController = __decorate([
    (0, swagger_1.ApiTags)('Gestion tarrification'),
    (0, common_1.Controller)('tarifications'),
    __metadata("design:paramtypes", [tarrification_service_1.TarrificationService])
], TarrificationController);
//# sourceMappingURL=tarrification.controller.js.map