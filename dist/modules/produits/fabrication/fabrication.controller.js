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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricationController = void 0;
const common_1 = require("@nestjs/common");
const fabrication_service_1 = require("./fabrication.service");
const create_fabrication_dto_1 = require("./dto/create-fabrication.dto");
const update_fabrication_dto_1 = require("./dto/update-fabrication.dto");
const swagger_1 = require("@nestjs/swagger");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const filter_dto_1 = require("src/common/filter/filter.dto");
let FabricationController = class FabricationController {
    fabricationService;
    constructor(fabricationService) {
        this.fabricationService = fabricationService;
    }
    create(createFabricationDto) {
        return this.fabricationService.create(createFabricationDto);
    }
    findAll(pageOptionsDto, filterStockDto) {
        return this.fabricationService.findAll(filterStockDto, pageOptionsDto);
    }
    async findFabricationByStatus(filterStockDto) {
        return this.fabricationService.findFabricationByStatus(filterStockDto);
    }
    findOne(id) {
        return this.fabricationService.findOne(id);
    }
    update(id, updateFabricationDto) {
        return this.fabricationService.update(id, updateFabricationDto);
    }
    remove(id) {
        return this.fabricationService.remove(id);
    }
};
exports.FabricationController = FabricationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new fabrication' }),
    (0, swagger_1.ApiBody)({
        type: create_fabrication_dto_1.CreateFabricationDto,
        description: 'Provide fabrication details to create a new fabrication record.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fabrication_dto_1.CreateFabricationDto]),
    __metadata("design:returntype", void 0)
], FabricationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all fabrication with pagination' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof page_options_dto_1.PageOptionsDto !== "undefined" && page_options_dto_1.PageOptionsDto) === "function" ? _a : Object, typeof (_b = typeof filter_dto_1.FilterStockDto !== "undefined" && filter_dto_1.FilterStockDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], FabricationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all fabrications by stock status' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof filter_dto_1.FilterStockDto !== "undefined" && filter_dto_1.FilterStockDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], FabricationController.prototype, "findFabricationByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific fabrication by its ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FabricationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific fabrication by its ID' }),
    (0, swagger_1.ApiBody)({
        type: update_fabrication_dto_1.UpdateFabricationDto,
        description: 'Provide updated details for the fabrication.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fabrication_dto_1.UpdateFabricationDto]),
    __metadata("design:returntype", void 0)
], FabricationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific fabrication by its ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FabricationController.prototype, "remove", null);
exports.FabricationController = FabricationController = __decorate([
    (0, swagger_1.ApiTags)('Gestion fabrication'),
    (0, common_1.Controller)('fabrication'),
    __metadata("design:paramtypes", [fabrication_service_1.FabricationService])
], FabricationController);
//# sourceMappingURL=fabrication.controller.js.map