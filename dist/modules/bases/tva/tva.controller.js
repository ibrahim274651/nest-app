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
exports.TvaController = void 0;
const common_1 = require("@nestjs/common");
const tva_service_1 = require("./tva.service");
const swagger_1 = require("@nestjs/swagger");
const create_tva_dto_1 = require("./dto/create-tva.dto");
const update_tva_dto_1 = require("./dto/update-tva.dto");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const app_constants_1 = require("src/app.constants");
const crud = app_constants_1.ApiConstants.crud('vat');
let TvaController = class TvaController {
    tvaService;
    constructor(tvaService) {
        this.tvaService = tvaService;
    }
    create(createTvaDto) {
        return this.tvaService.create(createTvaDto);
    }
    findAll(pageOptionsDto) {
        return this.tvaService.findAll(pageOptionsDto);
    }
    findOne(id) {
        return this.tvaService.findOne(id);
    }
    update(id, updateTvaDto) {
        return this.tvaService.update(id, updateTvaDto);
    }
    remove(id) {
        return this.tvaService.remove(id);
    }
};
exports.TvaController = TvaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: crud.create.summary }),
    (0, swagger_1.ApiBody)({
        type: create_tva_dto_1.CreateTvaDto,
        description: crud.create.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: crud.create.response201 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.create.response400 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tva_dto_1.CreateTvaDto]),
    __metadata("design:returntype", void 0)
], TvaController.prototype, "create", null);
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
], TvaController.prototype, "findAll", null);
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
], TvaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.update.summary }),
    (0, swagger_1.ApiBody)({
        type: update_tva_dto_1.UpdateTvaDto,
        description: crud.update.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: crud.update.response200 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.update.response400 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.update.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tva_dto_1.UpdateTvaDto]),
    __metadata("design:returntype", void 0)
], TvaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.remove.summary }),
    (0, swagger_1.ApiResponse)({ status: 204, description: crud.remove.response204 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.remove.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TvaController.prototype, "remove", null);
exports.TvaController = TvaController = __decorate([
    (0, swagger_1.ApiTags)('Gestion TVAs'),
    (0, common_1.Controller)('tvas'),
    __metadata("design:paramtypes", [tva_service_1.TvaService])
], TvaController);
//# sourceMappingURL=tva.controller.js.map