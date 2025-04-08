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
exports.CreateFabricationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
class CreateFabricationDto {
    designation;
    type;
    stock;
    stockMin;
}
exports.CreateFabricationDto = CreateFabricationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name or designation of the fabrication item.',
        example: 'Sugar',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFabricationDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of fabrication item. Must be one of the predefined types.',
        example: enumerations_enum_1.FabricationType.FABRICATION,
        enum: enumerations_enum_1.FabricationType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enumerations_enum_1.FabricationType),
    __metadata("design:type", typeof (_a = typeof enumerations_enum_1.FabricationType !== "undefined" && enumerations_enum_1.FabricationType) === "function" ? _a : Object)
], CreateFabricationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates whether the item is currently in stock.',
        example: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateFabricationDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum stock level required to avoid restocking alerts.',
        example: 0,
        minimum: 0,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFabricationDto.prototype, "stockMin", void 0);
//# sourceMappingURL=create-fabrication.dto.js.map