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
exports.NestedTarificationDto = exports.NestedTarificationSchema = exports.NestedTarification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
let NestedTarification = class NestedTarification extends mongoose_2.Document {
    tarificationId;
    caisse;
    tvaId;
    prixTTC;
    prixHT;
};
exports.NestedTarification = NestedTarification;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], NestedTarification.prototype, "tarificationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NestedTarification.prototype, "caisse", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], NestedTarification.prototype, "tvaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], NestedTarification.prototype, "prixTTC", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], NestedTarification.prototype, "prixHT", void 0);
exports.NestedTarification = NestedTarification = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NestedTarification);
exports.NestedTarificationSchema = mongoose_1.SchemaFactory.createForClass(NestedTarification);
class NestedTarificationDto {
    tarificationId;
    caisse;
    tvaId;
    prixTTC;
    prixHT;
}
exports.NestedTarificationDto = NestedTarificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '674a2cfa56ec9a24f3c4d901',
        description: 'Tarification ID',
        required: false,
        type: 'string',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], NestedTarificationDto.prototype, "tarificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Caisse',
        required: false,
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], NestedTarificationDto.prototype, "caisse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '67740803a5a1dfc22a47c6e2',
        type: 'string',
        description: 'Tva',
        required: false,
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], NestedTarificationDto.prototype, "tvaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 12.99,
        description: 'Selling price including taxes (TTC). Optional field.',
        type: 'number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'The prixTTC must be a valid number if provided' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], NestedTarificationDto.prototype, "prixTTC", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 12.99,
        description: 'Buying price including taxes (HT). Optional field.',
        type: 'number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'The prixHT must be a valid number if provided' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], NestedTarificationDto.prototype, "prixHT", void 0);
//# sourceMappingURL=tarification.embedabble.js.map