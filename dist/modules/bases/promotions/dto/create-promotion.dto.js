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
exports.CreatePromotionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const article_embedabble_1 = require("../../../../common/article.embedabble");
class CreatePromotionDto {
    designation;
    quantite;
    bonus;
    dateDebut;
    dateFin;
    periodeIllimite;
    articles;
}
exports.CreatePromotionDto = CreatePromotionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Happy Hour', required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'The quantity of the item on promotion (for example, 50% discount).',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePromotionDto.prototype, "quantite", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Base bonus per quantity of the item on promotion.',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePromotionDto.prototype, "bonus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
        example: new Date().toISOString(),
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePromotionDto.prototype, "dateDebut", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
        example: new Date().toISOString(),
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePromotionDto.prototype, "dateFin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Indicates whether the promotion is unlimited in time.',
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePromotionDto.prototype, "periodeIllimite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items',
        type: [article_embedabble_1.NestedArticleDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => article_embedabble_1.NestedArticleDto),
    __metadata("design:type", Array)
], CreatePromotionDto.prototype, "articles", void 0);
//# sourceMappingURL=create-promotion.dto.js.map