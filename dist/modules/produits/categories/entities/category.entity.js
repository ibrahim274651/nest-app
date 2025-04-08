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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
const tarrification_entity_1 = require("src/settings/bases/tarrification/entities/tarrification.entity");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
let Category = class Category extends mongoose_2.Document {
    designation;
    catalogue;
    stock;
    typeFamille;
    tarification;
};
exports.Category = Category;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: catalogue_embedabble_1.NestedCatalogSchema, required: true }),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalog !== "undefined" && catalogue_embedabble_1.NestedCatalog) === "function" ? _a : Object)
], Category.prototype, "catalogue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "stock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: enumerations_enum_1.CategorieType, required: true }),
    __metadata("design:type", typeof (_b = typeof enumerations_enum_1.CategorieType !== "undefined" && enumerations_enum_1.CategorieType) === "function" ? _b : Object)
], Category.prototype, "typeFamille", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: tarrification_entity_1.Tarrification.name,
        required: true,
    }),
    __metadata("design:type", Array)
], Category.prototype, "tarification", void 0);
exports.Category = Category = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Category);
exports.categorySchema = mongoose_1.SchemaFactory.createForClass(Category);
//# sourceMappingURL=category.entity.js.map