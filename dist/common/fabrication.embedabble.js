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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricationNestedDto = exports.NestedFabricationSchema = exports.NestedFabrication = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const fabrication_entity_1 = require("@/modules/produits/fabrication/entities/fabrication.entity");
let NestedFabrication = class NestedFabrication extends mongoose_2.Document {
    fabricationId;
    quantite;
    part;
    stockProduitArticle;
};
exports.NestedFabrication = NestedFabrication;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: fabrication_entity_1.Fabrication.name,
        required: false,
    }),
    __metadata("design:type", typeof (_a = typeof fabrication_entity_1.Fabrication !== "undefined" && fabrication_entity_1.Fabrication) === "function" ? _a : Object)
], NestedFabrication.prototype, "fabricationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], NestedFabrication.prototype, "quantite", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], NestedFabrication.prototype, "part", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NestedFabrication.prototype, "stockProduitArticle", void 0);
exports.NestedFabrication = NestedFabrication = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NestedFabrication);
exports.NestedFabricationSchema = mongoose_1.SchemaFactory.createForClass(NestedFabrication);
class FabricationNestedDto {
    fabricationId;
    quantite;
    part;
    stockProduitArticle;
}
exports.FabricationNestedDto = FabricationNestedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6756e3005fa2a7a9c5b41cf2',
        description: 'Fabrication ID',
        required: false,
        type: 'string',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FabricationNestedDto.prototype, "fabricationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.1, description: 'Quantity', type: 'number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], FabricationNestedDto.prototype, "quantite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Part', type: 'number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], FabricationNestedDto.prototype, "part", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Stock availability',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], FabricationNestedDto.prototype, "stockProduitArticle", void 0);
//# sourceMappingURL=fabrication.embedabble.js.map