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
exports.UpdateArticleDto = exports.FindArticlesDto = void 0;
const create_article_dto_1 = require("./create-article.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_2 = require("@nestjs/swagger");
class FindArticlesDto {
    searchText;
    categoryId;
    limit = 10;
    page = 1;
}
exports.FindArticlesDto = FindArticlesDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'Texte pour rechercher dans les champs "designation" et "reference".',
        example: 'article',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindArticlesDto.prototype, "searchText", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'ID de la catégorie pour filtrer les articles.',
        example: '64c2f09b2d5b9a001f4a5b12',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FindArticlesDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'Nombre d’articles par page (pagination).',
        example: 10,
        type: Number,
        minimum: 1,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], FindArticlesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        description: 'Numéro de page (pagination).',
        example: 1,
        type: Number,
        minimum: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], FindArticlesDto.prototype, "page", void 0);
class UpdateArticleDto extends (0, swagger_1.PartialType)(create_article_dto_1.CreateArticleDto) {
}
exports.UpdateArticleDto = UpdateArticleDto;
//# sourceMappingURL=update-article.dto.js.map