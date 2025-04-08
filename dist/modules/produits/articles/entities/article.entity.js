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
exports.articleSchema = exports.Article = exports.NestedUniteSchema = exports.NestedUnite = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tarification_embedabble_1 = require("../../../../common/tarification.embedabble");
const fabrication_embedabble_1 = require("../../../../common/fabrication.embedabble");
const category_entity_1 = require("../../categories/entities/category.entity");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
const unite_mesure_entity_1 = require("../../unite-mesure/entities/unite-mesure.entity");
let NestedUnite = class NestedUnite {
    unite;
    cond;
    prixCond;
};
exports.NestedUnite = NestedUnite;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: unite_mesure_entity_1.UniteMesure.name,
        required: false,
    }),
    __metadata("design:type", unite_mesure_entity_1.UniteMesure)
], NestedUnite.prototype, "unite", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], NestedUnite.prototype, "cond", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], NestedUnite.prototype, "prixCond", void 0);
exports.NestedUnite = NestedUnite = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NestedUnite);
exports.NestedUniteSchema = mongoose_1.SchemaFactory.createForClass(NestedUnite);
let Article = class Article extends mongoose_2.Document {
    reference;
    categorie;
    designation;
    seuilMinimum;
    codeBarre;
    catalogue;
    accompagnement;
    tarification;
    cuisson;
    gererStockProduit;
    visibleCaisse;
    fabrication;
    articleGeneric;
    uniteDetails;
};
exports.Article = Article;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Article.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: category_entity_1.Category.name,
        required: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], Article.prototype, "categorie", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true }),
    __metadata("design:type", String)
], Article.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "seuilMinimum", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Article.prototype, "codeBarre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: catalogue_embedabble_1.NestedCatalogSchema, required: true }),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalog !== "undefined" && catalogue_embedabble_1.NestedCatalog) === "function" ? _a : Object)
], Article.prototype, "catalogue", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: category_entity_1.Category.name,
        required: false,
    }),
    __metadata("design:type", Array)
], Article.prototype, "accompagnement", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [tarification_embedabble_1.NestedTarification], required: true }),
    __metadata("design:type", Array)
], Article.prototype, "tarification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, required: false, default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "cuisson", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "gererStockProduit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "visibleCaisse", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [fabrication_embedabble_1.NestedFabricationSchema], required: false }),
    __metadata("design:type", Array)
], Article.prototype, "fabrication", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, required: false, default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "articleGeneric", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.NestedUniteSchema }),
    __metadata("design:type", NestedUnite)
], Article.prototype, "uniteDetails", void 0);
exports.Article = Article = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Article);
const articleSchema = mongoose_1.SchemaFactory.createForClass(Article);
exports.articleSchema = articleSchema;
//# sourceMappingURL=article.entity.js.map