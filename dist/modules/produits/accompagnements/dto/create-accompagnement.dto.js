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
exports.CreateAccompagnementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
const fabrication_embedabble_1 = require("src/common/fabrication.embedabble");
const tarification_embedabble_1 = require("src/common/tarification.embedabble");
class CreateAccompagnementDto {
    reference;
    designation;
    categorie;
    catalogue;
    tarification;
    gererStockProduit;
    stockMini;
    fabrication;
    visibleCaisse;
    accompGeneric;
    description;
}
exports.CreateAccompagnementDto = CreateAccompagnementDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Extra Cheese',
        description: 'The name or designation of the accompaniment (e.g., extra toppings, sides, or sauces).',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAccompagnementDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6733628eec8adf440528d90a',
        description: 'The ID of the category to which this accompaniment belongs (e.g., Toppings, Sauces, Sides).',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateAccompagnementDto.prototype, "categorie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference to the catalog to which the category belongs.',
        type: catalogue_embedabble_1.NestedCatalogDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => catalogue_embedabble_1.NestedCatalogDto),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalogDto !== "undefined" && catalogue_embedabble_1.NestedCatalogDto) === "function" ? _a : Object)
], CreateAccompagnementDto.prototype, "catalogue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: [tarification_embedabble_1.NestedTarificationDto],
        description: 'Pricing details for the accompaniment, including variants (e.g., size-based pricing or time-specific discounts).',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => tarification_embedabble_1.NestedTarificationDto),
    __metadata("design:type", Array)
], CreateAccompagnementDto.prototype, "tarification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Indicates whether stock management is enabled for this accompaniment (e.g., to track inventory levels).',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateAccompagnementDto.prototype, "gererStockProduit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: 'The minimum stock level for this accompaniment before it triggers a restock alert.',
        type: 'number',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CreateAccompagnementDto.prototype, "stockMini", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
        type: [fabrication_embedabble_1.FabricationNestedDto],
        description: 'Details of any fabrication or preparation steps required for the accompaniment (e.g., pre-mixed sauces).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'fabrication must be an array if provided' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => fabrication_embedabble_1.FabricationNestedDto),
    __metadata("design:type", Array)
], CreateAccompagnementDto.prototype, "fabrication", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Indicates whether the accompaniment is visible on the POS system for easy access by staff.',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateAccompagnementDto.prototype, "visibleCaisse", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Indicates whether the accompaniment is a generic customizable item (e.g., a topping that can be adjusted by the customer).',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateAccompagnementDto.prototype, "accompGeneric", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Cheddar cheese, suitable for vegetarians.',
        description: 'A brief description of the accompaniment, including key details (e.g., dietary information or special characteristics).',
        required: false,
    }),
    __metadata("design:type", String)
], CreateAccompagnementDto.prototype, "description", void 0);
//# sourceMappingURL=create-accompagnement.dto.js.map