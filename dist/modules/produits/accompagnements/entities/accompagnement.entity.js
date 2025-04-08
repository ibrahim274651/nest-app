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
exports.AccompagnementSchema = exports.Accompagnement = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const tarification_embedabble_1 = require("src/common/tarification.embedabble");
const fabrication_embedabble_1 = require("src/common/fabrication.embedabble");
const category_entity_1 = require("../../categories/entities/category.entity");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
let Accompagnement = class Accompagnement extends mongoose_1.Document {
    reference;
    designation;
    tarification;
    categorie;
    catalogue;
    gererStockProduit;
    stockMini;
    fabrication;
    visibleCaisse;
    accompGeneric;
    description;
};
exports.Accompagnement = Accompagnement;
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Accompagnement.prototype, "reference", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: String, unique: true }),
    __metadata("design:type", String)
], Accompagnement.prototype, "designation", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [tarification_embedabble_1.NestedTarification], required: true }),
    __metadata("design:type", Array)
], Accompagnement.prototype, "tarification", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: category_entity_1.Category.name,
        required: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], Accompagnement.prototype, "categorie", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: catalogue_embedabble_1.NestedCatalogSchema, required: true }),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalog !== "undefined" && catalogue_embedabble_1.NestedCatalog) === "function" ? _a : Object)
], Accompagnement.prototype, "catalogue", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Accompagnement.prototype, "gererStockProduit", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], Accompagnement.prototype, "stockMini", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [fabrication_embedabble_1.NestedFabrication], required: false, default: [] }),
    __metadata("design:type", Array)
], Accompagnement.prototype, "fabrication", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Accompagnement.prototype, "visibleCaisse", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, required: false, default: false }),
    __metadata("design:type", Boolean)
], Accompagnement.prototype, "accompGeneric", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Accompagnement.prototype, "description", void 0);
exports.Accompagnement = Accompagnement = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true, versionKey: false })
], Accompagnement);
exports.AccompagnementSchema = mongoose_2.SchemaFactory.createForClass(Accompagnement);
//# sourceMappingURL=accompagnement.entity.js.map