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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enumerations_enum_1 = require("../enumerations.enum");
let EnumTypeController = class EnumTypeController {
    getCategorieType() {
        const excludedTypes = ['FABRICATION'];
        const type = Object.values(enumerations_enum_1.CategorieType)
            .filter((value) => !excludedTypes.includes(value))
            .map((value) => value);
        return {
            message: 'Available categories types',
            data: type,
        };
    }
    getCategorieTypes() {
        const type = Object.values(enumerations_enum_1.CategorieType);
        return {
            message: 'Available categories types',
            data: type,
        };
    }
    getFabricationType() {
        const type = Object.values(enumerations_enum_1.FabricationType);
        return {
            message: 'Available fabrication types',
            data: type,
        };
    }
    getOtherMouvementTypes() {
        return {
            message: 'All available mouvement types',
            data: Object.values(enumerations_enum_1.OtherType),
        };
    }
    getGeneralMouvementTypes() {
        return {
            message: 'Available general mouvement types',
            data: Object.values(enumerations_enum_1.MouvementType),
        };
    }
    getIncomingMouvementTypes() {
        return {
            message: 'Available incoming mouvement types',
            data: Object.values(enumerations_enum_1.OperationTypeIn),
        };
    }
    getOutgoingMouvementTypes() {
        return {
            message: 'Available outgoing mouvement types',
            data: Object.values(enumerations_enum_1.OperationTypeOut),
        };
    }
    getTransferStatus() {
        return {
            message: 'Available outgoing mouvement types',
            data: Object.values(enumerations_enum_1.GlobalStatus),
        };
    }
    getModeTypes() {
        return {
            message: 'Available types',
            data: Object.values(enumerations_enum_1.ConsumptionMode),
        };
    }
};
exports.EnumTypeController = EnumTypeController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get three categories types to use in article' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getCategorieType", null);
__decorate([
    (0, common_1.Get)('category-type'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getCategorieTypes", null);
__decorate([
    (0, common_1.Get)('fabrication-type'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fabrication types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getFabricationType", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get other mouvement types ' }),
    (0, common_1.Get)('mouvement-types/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getOtherMouvementTypes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all mouvement types (general)' }),
    (0, common_1.Get)('mouvement-types/general'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getGeneralMouvementTypes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all incoming mouvement types' }),
    (0, common_1.Get)('mouvement-types/in'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getIncomingMouvementTypes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all outgoing mouvement types' }),
    (0, common_1.Get)('mouvement-types/out'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getOutgoingMouvementTypes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all transfer status' }),
    (0, common_1.Get)('transfert-status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getTransferStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all  consomption mode' }),
    (0, common_1.Get)('/type-mode'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnumTypeController.prototype, "getModeTypes", null);
exports.EnumTypeController = EnumTypeController = __decorate([
    (0, swagger_1.ApiTags)('Enum Type'),
    (0, common_1.Controller)('enum-type')
], EnumTypeController);
//# sourceMappingURL=utils.contoller.js.map