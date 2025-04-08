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
exports.CuissonsController = void 0;
const common_1 = require("@nestjs/common");
const cuissons_service_1 = require("./cuissons.service");
const create_cuisson_dto_1 = require("./dto/create-cuisson.dto");
const update_cuisson_dto_1 = require("./dto/update-cuisson.dto");
const swagger_1 = require("@nestjs/swagger");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const app_constants_1 = require("src/app.constants");
const crud = app_constants_1.ApiConstants.crud(' cuisson');
let CuissonsController = class CuissonsController {
    cuissonsService;
    constructor(cuissonsService) {
        this.cuissonsService = cuissonsService;
    }
    create(createCuissonDto) {
        return this.cuissonsService.create(createCuissonDto);
    }
    findAll(pageOptionsDto) {
        return this.cuissonsService.findAll(pageOptionsDto);
    }
    findForDropdown() {
        return this.cuissonsService.getDropdown();
    }
    findOne(id) {
        return this.cuissonsService.findOne(id);
    }
    update(id, updateCuissonDto) {
        return this.cuissonsService.update(id, updateCuissonDto);
    }
    remove(id) {
        return this.cuissonsService.remove(id);
    }
};
exports.CuissonsController = CuissonsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: crud.create.summary }),
    (0, swagger_1.ApiBody)({
        type: create_cuisson_dto_1.CreateCuissonDto,
        description: crud.create.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: crud.create.response201 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.create.response400 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cuisson_dto_1.CreateCuissonDto]),
    __metadata("design:returntype", void 0)
], CuissonsController.prototype, "create", null);
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
], CuissonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/dropdown'),
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
    __metadata("design:returntype", void 0)
], CuissonsController.prototype, "findForDropdown", null);
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
], CuissonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.update.summary }),
    (0, swagger_1.ApiBody)({
        type: update_cuisson_dto_1.UpdateCuissonDto,
        description: crud.update.bodyDescription,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: crud.update.response200 }),
    (0, swagger_1.ApiResponse)({ status: 400, description: crud.update.response400 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.update.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cuisson_dto_1.UpdateCuissonDto]),
    __metadata("design:returntype", void 0)
], CuissonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: crud.remove.summary }),
    (0, swagger_1.ApiResponse)({ status: 204, description: crud.remove.response204 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: crud.remove.response404 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CuissonsController.prototype, "remove", null);
exports.CuissonsController = CuissonsController = __decorate([
    (0, swagger_1.ApiTags)('Gestion cuissons'),
    (0, common_1.Controller)('cuissons'),
    __metadata("design:paramtypes", [cuissons_service_1.CuissonsService])
], CuissonsController);
//# sourceMappingURL=cuissons.controller.js.map