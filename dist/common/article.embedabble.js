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
exports.NestedArticleDto = exports.NestedArticleSchema = exports.NestedArticle = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const article_entity_1 = require("src/modules/produits/articles/entities/article.entity");
let NestedArticle = class NestedArticle extends mongoose_2.Document {
    articleId;
    achat;
    offert;
};
exports.NestedArticle = NestedArticle;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: article_entity_1.Article.name,
        required: false,
    }),
    __metadata("design:type", typeof (_a = typeof article_entity_1.Article !== "undefined" && article_entity_1.Article) === "function" ? _a : Object)
], NestedArticle.prototype, "articleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NestedArticle.prototype, "achat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NestedArticle.prototype, "offert", void 0);
exports.NestedArticle = NestedArticle = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NestedArticle);
exports.NestedArticleSchema = mongoose_1.SchemaFactory.createForClass(NestedArticle);
class NestedArticleDto {
    articleId;
    achat;
    offert;
}
exports.NestedArticleDto = NestedArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '676eada9b8a048067de18b71',
        description: 'List of article IDs to which the promotion is applied.',
        required: true,
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], NestedArticleDto.prototype, "articleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the item is available for purchase.',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NestedArticleDto.prototype, "achat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the item is part of a special offer.',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NestedArticleDto.prototype, "offert", void 0);
//# sourceMappingURL=article.embedabble.js.map