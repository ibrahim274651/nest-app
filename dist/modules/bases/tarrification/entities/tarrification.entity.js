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
exports.TarrificationSchema = exports.Tarrification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tva_entity_1 = require("../../tva/entities/tva.entity");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
let Tarrification = class Tarrification extends mongoose_2.Document {
    designation;
    modeConsommation;
    defaultTva;
};
exports.Tarrification = Tarrification;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Tarrification.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: enumerations_enum_1.ConsumptionMode }),
    __metadata("design:type", typeof (_a = typeof enumerations_enum_1.ConsumptionMode !== "undefined" && enumerations_enum_1.ConsumptionMode) === "function" ? _a : Object)
], Tarrification.prototype, "modeConsommation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: tva_entity_1.Tva.name }),
    __metadata("design:type", tva_entity_1.Tva)
], Tarrification.prototype, "defaultTva", void 0);
exports.Tarrification = Tarrification = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Tarrification);
exports.TarrificationSchema = mongoose_1.SchemaFactory.createForClass(Tarrification);
exports.TarrificationSchema.pre(['find', 'findOne'], async function (next) {
    this.populate({ path: 'defaultTva', select: '-createdAt -updatedAt' });
    next();
});
//# sourceMappingURL=tarrification.entity.js.map