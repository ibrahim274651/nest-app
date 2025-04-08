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
exports.CreateMenuDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const level_embedabble_1 = require("../../../../common/level.embedabble");
const tarification_embedabble_1 = require("src/common/tarification.embedabble");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
class CreateMenuDto {
    reference;
    designation;
    categorie;
    catalogue;
    articleGeneric;
    niveaux;
    tarification;
    visibleCaisse;
    codeBarre;
    description;
    happyHour;
}
exports.CreateMenuDto = CreateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Petit Déjeuner Deluxe',
        description: 'The name or designation of the menu item (e.g., breakfast, lunch, or dinner special).',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '673367a2c2de36493a2d7d5d',
        description: 'The ID of the category to which this menu belongs (e.g., Drinks, Appetizers, Main Course).',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "categorie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference to the catalog to which the category belongs.',
        type: catalogue_embedabble_1.NestedCatalogDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => catalogue_embedabble_1.NestedCatalogDto),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalogDto !== "undefined" && catalogue_embedabble_1.NestedCatalogDto) === "function" ? _a : Object)
], CreateMenuDto.prototype, "catalogue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indicates if the menu includes generic items that can be customized (e.g., a build-your-own meal option).',
        type: 'boolean',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CreateMenuDto.prototype, "articleGeneric", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Levels of customization or options available within this menu',
        type: [level_embedabble_1.NiveauxDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => level_embedabble_1.NiveauxDto),
    __metadata("design:type", Array)
], CreateMenuDto.prototype, "niveaux", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: true,
        type: [tarification_embedabble_1.NestedTarificationDto],
        description: 'Details of the pricing structure for the menu, including variants (e.g., size-based or time-based pricing).',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => tarification_embedabble_1.NestedTarificationDto),
    __metadata("design:type", Array)
], CreateMenuDto.prototype, "tarification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indicates whether the menu is visible in the cash register system for quick access by staff.',
        type: 'boolean',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMenuDto.prototype, "visibleCaisse", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'CODE123456',
        description: 'Optional barcode for the menu, used for scanning and inventory tracking.',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "codeBarre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'A special breakfast menu that includes pancakes, coffee, and juice.',
        description: 'A short description providing additional details about the menu.',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Indicates if the menu is available during Happy Hour (e.g., discounted price periods).',
        type: 'boolean',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateMenuDto.prototype, "happyHour", void 0);
//# sourceMappingURL=create-menu.dto.js.map