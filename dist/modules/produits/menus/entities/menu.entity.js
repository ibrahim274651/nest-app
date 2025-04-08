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
exports.MenuSchema = exports.Menu = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const level_embedabble_1 = require("../../../../common/level.embedabble");
const category_entity_1 = require("../../categories/entities/category.entity");
const tarification_embedabble_1 = require("src/common/tarification.embedabble");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
let Menu = class Menu extends mongoose_1.Document {
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
};
exports.Menu = Menu;
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Menu.prototype, "reference", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Menu.prototype, "designation", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: category_entity_1.Category.name,
        required: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], Menu.prototype, "categorie", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: catalogue_embedabble_1.NestedCatalogSchema, required: true }),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalog !== "undefined" && catalogue_embedabble_1.NestedCatalog) === "function" ? _a : Object)
], Menu.prototype, "catalogue", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, required: false, default: false }),
    __metadata("design:type", Boolean)
], Menu.prototype, "articleGeneric", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: [level_embedabble_1.NiveauxSchema],
        required: true,
    }),
    __metadata("design:type", Array)
], Menu.prototype, "niveaux", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [tarification_embedabble_1.NestedTarification], required: false, default: [] }),
    __metadata("design:type", Array)
], Menu.prototype, "tarification", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Menu.prototype, "visibleCaisse", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: String, unique: true }),
    __metadata("design:type", String)
], Menu.prototype, "codeBarre", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: String, default: '' }),
    __metadata("design:type", String)
], Menu.prototype, "description", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Boolean, required: false, default: false }),
    __metadata("design:type", Boolean)
], Menu.prototype, "happyHour", void 0);
exports.Menu = Menu = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true, versionKey: false })
], Menu);
exports.MenuSchema = mongoose_2.SchemaFactory.createForClass(Menu);
//# sourceMappingURL=menu.entity.js.map