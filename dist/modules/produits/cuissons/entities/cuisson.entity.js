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
exports.CuissonSchema = exports.Cuisson = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const catalogue_embedabble_1 = require("src/common/catalogue.embedabble");
let Cuisson = class Cuisson extends mongoose_2.Document {
    catalogue;
    designation;
};
exports.Cuisson = Cuisson;
__decorate([
    (0, mongoose_1.Prop)({ type: catalogue_embedabble_1.NestedCatalogSchema, required: true }),
    __metadata("design:type", typeof (_a = typeof catalogue_embedabble_1.NestedCatalog !== "undefined" && catalogue_embedabble_1.NestedCatalog) === "function" ? _a : Object)
], Cuisson.prototype, "catalogue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Cuisson.prototype, "designation", void 0);
exports.Cuisson = Cuisson = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Cuisson);
exports.CuissonSchema = mongoose_1.SchemaFactory.createForClass(Cuisson);
//# sourceMappingURL=cuisson.entity.js.map