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
exports.FilterForTarificationDto = exports.FilterConsumptionModeDto = exports.FilterTypeCategoryDto = exports.FilterStoreDto = exports.FilterItemDto = exports.FilterCategoryDto = exports.FilterFundDto = exports.FilterStockDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_validator_2 = require("class-validator");
const enumerations_enum_1 = require("../../utils/enumerations.enum");
class FilterStockDto {
    enable;
}
exports.FilterStockDto = FilterStockDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
        description: 'Stock availability to filter.',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterStockDto.prototype, "enable", void 0);
class FilterFundDto {
    enable;
}
exports.FilterFundDto = FilterFundDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
        description: 'Fund availability to filter.',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterFundDto.prototype, "enable", void 0);
class FilterCategoryDto {
    categoryId;
}
exports.FilterCategoryDto = FilterCategoryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Category ID to filter.',
        type: String,
    }),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterCategoryDto.prototype, "categoryId", void 0);
class FilterItemDto {
    itemId;
}
exports.FilterItemDto = FilterItemDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Item ID to filter.',
        example: '67b584d0cde58a12568d2bb3',
        type: String,
    }),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterItemDto.prototype, "itemId", void 0);
class FilterStoreDto {
    storeId;
}
exports.FilterStoreDto = FilterStoreDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Store ID to filter.',
        example: '',
        type: String,
    }),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterStoreDto.prototype, "storeId", void 0);
class FilterTypeCategoryDto {
    typeFamille;
}
exports.FilterTypeCategoryDto = FilterTypeCategoryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Family type for filtering categories',
        enum: enumerations_enum_1.CategorieType,
        required: true,
    }),
    (0, class_validator_1.IsEnum)(enumerations_enum_1.CategorieType),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], FilterTypeCategoryDto.prototype, "typeFamille", void 0);
class FilterConsumptionModeDto {
    tarificationId;
    mode;
}
exports.FilterConsumptionModeDto = FilterConsumptionModeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tarification Id',
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], FilterConsumptionModeDto.prototype, "tarificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Consumption type for filtering categories',
        enum: enumerations_enum_1.ConsumptionMode,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(enumerations_enum_1.ConsumptionMode),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], FilterConsumptionModeDto.prototype, "mode", void 0);
class FilterForTarificationDto {
    itemId;
    categoryId;
    enable;
    tarificationId;
    mode;
}
exports.FilterForTarificationDto = FilterForTarificationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Item ID to filter.',
        example: '67b584d0cde58a12568d2bb3',
        type: String,
    }),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterForTarificationDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Category ID to filter.',
        type: String,
    }),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterForTarificationDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
        description: 'Stock availability to filter.',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterForTarificationDto.prototype, "enable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tarification Id',
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], FilterForTarificationDto.prototype, "tarificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Consumption type for filtering categories',
        enum: enumerations_enum_1.ConsumptionMode,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(enumerations_enum_1.ConsumptionMode),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], FilterForTarificationDto.prototype, "mode", void 0);
//# sourceMappingURL=filter.dto.js.map