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
exports.NestedCatalogDto = exports.NestedCatalogSchema = exports.NestedCatalog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
let NestedCatalog = class NestedCatalog extends mongoose_2.Document {
    image;
};
exports.NestedCatalog = NestedCatalog;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], NestedCatalog.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, default: '' }),
    __metadata("design:type", String)
], NestedCatalog.prototype, "image", void 0);
exports.NestedCatalog = NestedCatalog = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NestedCatalog);
exports.NestedCatalogSchema = mongoose_1.SchemaFactory.createForClass(NestedCatalog);
class NestedCatalogDto {
    id;
    image;
}
exports.NestedCatalogDto = NestedCatalogDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6801a328b9b33e8b5c12345f',
        description: 'ID of the catalogue item',
        required: true,
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], NestedCatalogDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image URL of the catalogue item',
        example: 'image_1.png',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NestedCatalogDto.prototype, "image", void 0);
//# sourceMappingURL=catalogue.embedabble.js.map