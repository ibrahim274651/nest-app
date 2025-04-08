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
exports.CreateArticleDto = exports.NestedUniteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const tarification_embedabble_1 = require("../../../../common/tarification.embedabble");
const fabrication_embedabble_1 = require("../../../../common/fabrication.embedabble");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
class NestedUniteDto {
    unite;
    cond;
}
exports.NestedUniteDto = NestedUniteDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '67336142ec8adf440528d8fb',
        description: 'Unit ID for the article',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NestedUniteDto.prototype, "unite", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: 'List of accompaniments',
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NestedUniteDto.prototype, "cond", void 0);
class CreateArticleDto {
    reference;
    designation;
    categorie;
    seuilMinimum;
    codeBarre;
    catalogue;
    tarification;
    gererStockProduit;
    cuisson;
    visibleCaisse;
    accompagnement;
    fabrication;
    articleGeneric;
    uniteDetails;
}
exports.CreateArticleDto = CreateArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pizza Margherita',
        description: 'Designation of the article',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '67336142ec8adf440528d8fb',
        description: 'Category ID for the article',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toString()),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "categorie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Minimum threshold', type: 'number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "seuilMinimum", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'XVADGSFRGFHG1Q',
        description: 'Unique codeBarre for the article',
        required: false,
    }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "codeBarre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference to the catalog to which the category belongs.',
        type: catalogue_embedabble_1.NestedCatalogDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => catalogue_embedabble_1.NestedCatalogDto),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalogDto !== "undefined" && catalogue_embedabble_1.NestedCatalogDto) === "function" ? _a : Object)
], CreateArticleDto.prototype, "catalogue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: [tarification_embedabble_1.NestedTarificationDto],
        description: 'Details of the tarification',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => tarification_embedabble_1.NestedTarificationDto),
    __metadata("design:type", Array)
], CreateArticleDto.prototype, "tarification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Stock availability',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateArticleDto.prototype, "gererStockProduit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Cuisson availability',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateArticleDto.prototype, "cuisson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Caisse availability',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateArticleDto.prototype, "visibleCaisse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['67b735ed1193bc5b6b5c97eb'],
        description: 'List of accompaniments',
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateArticleDto.prototype, "accompagnement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
        type: [fabrication_embedabble_1.FabricationNestedDto],
        description: 'Details of the fabrication (optional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'fabrication must be an array if provided' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => fabrication_embedabble_1.FabricationNestedDto),
    __metadata("design:type", Array)
], CreateArticleDto.prototype, "fabrication", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Stock availability',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateArticleDto.prototype, "articleGeneric", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => NestedUniteDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NestedUniteDto),
    __metadata("design:type", NestedUniteDto)
], CreateArticleDto.prototype, "uniteDetails", void 0);
//# sourceMappingURL=create-article.dto.js.map