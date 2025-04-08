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
exports.CreateCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
const class_transformer_1 = require("class-transformer");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
class CreateCategoryDto {
    designation;
    catalogue;
    stock;
    typeFamille;
    tarification;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cocktails',
        description: 'The label of the category.',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'designation is required' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference to the catalog to which the category belongs.',
        type: catalogue_embedabble_1.NestedCatalogDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => catalogue_embedabble_1.NestedCatalogDto),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalogDto !== "undefined" && catalogue_embedabble_1.NestedCatalogDto) === "function" ? _a : Object)
], CreateCategoryDto.prototype, "catalogue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indicates whether stock is available for this category.',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCategoryDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: enumerations_enum_1.CategorieType.ARTICLE,
        description: 'The type of category. Possible values are: "article" (standard item), "accompaniment" (side dish).',
        enum: enumerations_enum_1.CategorieType,
    }),
    (0, class_validator_1.IsEnum)(enumerations_enum_1.CategorieType),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "typeFamille", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of identifiers for the pricing structure of this category.',
        type: [String],
        example: ['674a2cfa56ec9a24f3c4d901', '674b0e9f88d24f37c4b3a501'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateCategoryDto.prototype, "tarification", void 0);
//# sourceMappingURL=create-category.dto.js.map