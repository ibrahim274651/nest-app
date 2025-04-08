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
exports.UniteMesureController = void 0;
const common_1 = require("@nestjs/common");
const unite_mesure_service_1 = require("./unite-mesure.service");
const create_unite_mesure_dto_1 = require("./dto/create-unite-mesure.dto");
const update_unite_mesure_dto_1 = require("./dto/update-unite-mesure.dto");
const swagger_1 = require("@nestjs/swagger");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const app_constants_1 = require("src/app.constants");
const crud = app_constants_1.ApiConstants.crud('unit of measure');
const dropDown = app_constants_1.ApiConstants.crud('', 'Get the dropdown list for the unit of measurement');
let UniteMesureController = class UniteMesureController {
    uniteMesureService;
    constructor(uniteMesureService) {
        this.uniteMesureService = uniteMesureService;
    }
    create(createUniteMesureDto) {
        return this.uniteMesureService.create(createUniteMesureDto);
    }
    findAll(pageOptionsDto) {
        return this.uniteMesureService.findAll(pageOptionsDto);
    }
    getDropDown() {
        return this.uniteMesureService.dropDownForUniteMesure();
    }
    findOne(id) {
        return this.uniteMesureService.findOne(id);
    }
    update(id, updateUniteMesureDto) {
        return this.uniteMesureService.update(id, updateUniteMesureDto);
    }
    remove(id) {
        return this.uniteMesureService.remove(id);
    }
};
exports.UniteMesureController = UniteMesureController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: crud.create.summary }),
    (0, swagger_1.ApiBody)({
        type: create_unite_mesure_dto_1.CreateUniteMesureDto,
        description: crud.create.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: crud.create.response201 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.create.response400 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unite_mesure_dto_1.CreateUniteMesureDto]),
    __metadata("design:returntype", void 0)
], UniteMesureController.prototype, "create", null);
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
], UniteMesureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dropdown-unite'),
    (0, swagger_1.ApiOperation)({ summary: dropDown.summary }),
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
    __metadata("design:returntype", void 0)
], UniteMesureController.prototype, "getDropDown", null);
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
], UniteMesureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.update.summary }),
    (0, swagger_1.ApiBody)({
        type: update_unite_mesure_dto_1.UpdateUniteMesureDto,
        description: crud.update.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: crud.update.response200 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.update.response400 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.update.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_unite_mesure_dto_1.UpdateUniteMesureDto]),
    __metadata("design:returntype", void 0)
], UniteMesureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.remove.summary }),
    (0, swagger_1.ApiResponse)({ status: 204, description: crud.remove.response204 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.remove.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UniteMesureController.prototype, "remove", null);
exports.UniteMesureController = UniteMesureController = __decorate([
    (0, swagger_1.ApiTags)('Unite de mesure'),
    (0, common_1.Controller)('unite-mesure'),
    __metadata("design:paramtypes", [unite_mesure_service_1.UniteMesureService])
], UniteMesureController);
//# sourceMappingURL=unite-mesure.controller.js.map