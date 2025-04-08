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
exports.FabricationSchema = exports.Fabrication = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
let Fabrication = class Fabrication extends mongoose_2.Document {
    reference;
    designation;
    type;
    stock;
    stockMin;
};
exports.Fabrication = Fabrication;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Fabrication.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true }),
    __metadata("design:type", String)
], Fabrication.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, enum: enumerations_enum_1.FabricationType }),
    __metadata("design:type", typeof (_a = typeof enumerations_enum_1.FabricationType !== "undefined" && enumerations_enum_1.FabricationType) === "function" ? _a : Object)
], Fabrication.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean }),
    __metadata("design:type", Boolean)
], Fabrication.prototype, "stock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Fabrication.prototype, "stockMin", void 0);
exports.Fabrication = Fabrication = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Fabrication);
exports.FabricationSchema = mongoose_1.SchemaFactory.createForClass(Fabrication);
//# sourceMappingURL=fabrication.entity.js.map