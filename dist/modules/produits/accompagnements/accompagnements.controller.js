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
exports.AccompagnementsController = void 0;
const common_1 = require("@nestjs/common");
const create_accompagnement_dto_1 = require("./dto/create-accompagnement.dto");
const update_accompagnement_dto_1 = require("./dto/update-accompagnement.dto");
const swagger_1 = require("@nestjs/swagger");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const accompagnements_service_1 = require("./accompagnements.service");
const filter_dto_1 = require("src/common/filter/filter.dto");
let AccompagnementsController = class AccompagnementsController {
    accompagnementService;
    constructor(accompagnementService) {
        this.accompagnementService = accompagnementService;
    }
    create(createAccompagnementDto) {
        return this.accompagnementService.create(createAccompagnementDto);
    }
    findAll(pageOptionsDto, filterStockDto) {
        return this.accompagnementService.findAll(filterStockDto, pageOptionsDto);
    }
    findOne(id) {
        return this.accompagnementService.findOne(id);
    }
    update(id, updateAccompagnementDto) {
        return this.accompagnementService.update(id, updateAccompagnementDto);
    }
    remove(id) {
        return this.accompagnementService.remove(id);
    }
};
exports.AccompagnementsController = AccompagnementsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new addon' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_accompagnement_dto_1.CreateAccompagnementDto]),
    __metadata("design:returntype", void 0)
], AccompagnementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all addons with pagination',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof page_options_dto_1.PageOptionsDto !== "undefined" && page_options_dto_1.PageOptionsDto) === "function" ? _a : Object, typeof (_b = typeof filter_dto_1.FilterStockDto !== "undefined" && filter_dto_1.FilterStockDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AccompagnementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific addon by its ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccompagnementsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a specific addon by its ID',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_accompagnement_dto_1.UpdateAccompagnementDto]),
    __metadata("design:returntype", void 0)
], AccompagnementsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a specific addon by its ID',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccompagnementsController.prototype, "remove", null);
exports.AccompagnementsController = AccompagnementsController = __decorate([
    (0, swagger_1.ApiTags)('Gestion accompagnements'),
    (0, common_1.Controller)('accompagnements'),
    __metadata("design:paramtypes", [accompagnements_service_1.AccompagnementsService])
], AccompagnementsController);
//# sourceMappingURL=accompagnements.controller.js.map