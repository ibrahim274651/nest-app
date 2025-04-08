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
exports.DeleteImageDto = exports.OtherImageDto = exports.CreateCatalogueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCatalogueDto {
    designation;
    images;
}
exports.CreateCatalogueDto = CreateCatalogueDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'Pizza Margherita',
        description: 'Designation of the catalog',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['image1.jpg', 'image2.jpg'],
        description: 'Array of uploaded image paths',
        type: 'array',
        items: { type: 'string', format: 'binary' },
    }),
    __metadata("design:type", Array)
], CreateCatalogueDto.prototype, "images", void 0);
class OtherImageDto {
    images;
}
exports.OtherImageDto = OtherImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['image1.jpg', 'image2.jpg'],
        description: 'Array of uploaded image paths',
        type: 'array',
        items: { type: 'string', format: 'binary' },
    }),
    __metadata("design:type", Array)
], OtherImageDto.prototype, "images", void 0);
class DeleteImageDto {
    url;
}
exports.DeleteImageDto = DeleteImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'image1.jpg',
        description: 'The name of the image to remove from the catalogue',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteImageDto.prototype, "url", void 0);
//# sourceMappingURL=create-catalogue.dto.js.map