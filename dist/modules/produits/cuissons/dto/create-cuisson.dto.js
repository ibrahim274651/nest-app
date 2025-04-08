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
exports.CreateCuissonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
class CreateCuissonDto {
    catalogue;
    designation;
}
exports.CreateCuissonDto = CreateCuissonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference to the catalog to which the category belongs.',
        type: catalogue_embedabble_1.NestedCatalogDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => catalogue_embedabble_1.NestedCatalogDto),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalogDto !== "undefined" && catalogue_embedabble_1.NestedCatalogDto) === "function" ? _a : Object)
], CreateCuissonDto.prototype, "catalogue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cuisson sous vide ',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCuissonDto.prototype, "designation", void 0);
//# sourceMappingURL=create-cuisson.dto.js.map