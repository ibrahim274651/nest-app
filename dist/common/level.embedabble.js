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
exports.NiveauxDto = exports.NiveauxSchema = exports.Niveaux = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const article_entity_1 = require("@/modules/produits/articles/entities/article.entity");
const menu_stage_entity_1 = require("@/modules/produits/menu-stage/entities/menu-stage.entity");
let Niveaux = class Niveaux extends mongoose_2.Document {
    niveauId;
    articleIds;
};
exports.Niveaux = Niveaux;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: menu_stage_entity_1.MenuStage.name,
        required: false,
    }),
    __metadata("design:type", typeof (_a = typeof menu_stage_entity_1.MenuStage !== "undefined" && menu_stage_entity_1.MenuStage) === "function" ? _a : Object)
], Niveaux.prototype, "niveauId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.default.Schema.Types.ObjectId],
        required: false,
        ref: article_entity_1.Article.name,
        default: [],
    }),
    __metadata("design:type", Array)
], Niveaux.prototype, "articleIds", void 0);
exports.Niveaux = Niveaux = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Niveaux);
exports.NiveauxSchema = mongoose_1.SchemaFactory.createForClass(Niveaux);
class NiveauxDto {
    niveauId;
    articleIds;
}
exports.NiveauxDto = NiveauxDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '676536e24608ef44cafdb11d',
        description: 'Menu stage ID (must be a valid ObjectId)',
        required: false,
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NiveauxDto.prototype, "niveauId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['67b5b26ea0722cd57ecef5e4', '67b584d0cde58a12568d2bb3'],
        type: 'array',
        items: {
            type: 'string',
            description: 'Article ID (must be valid ObjectId)',
        },
        description: 'Array of article IDs (optional)',
    }),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NiveauxDto.prototype, "articleIds", void 0);
//# sourceMappingURL=level.embedabble.js.map