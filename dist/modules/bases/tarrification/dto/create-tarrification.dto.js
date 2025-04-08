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
exports.CreateTarrificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enumerations_enum_1 = require("src/utils/enumerations.enum");
class CreateTarrificationDto {
    designation;
    modeConsommation;
    defaultTva;
}
exports.CreateTarrificationDto = CreateTarrificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tarrification name',
        example: 'Standard Tarification',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTarrificationDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Consumption mode',
        enum: enumerations_enum_1.ConsumptionMode,
        example: enumerations_enum_1.ConsumptionMode.SURPLACE,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTarrificationDto.prototype, "modeConsommation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Default TVA ID',
        example: '64c7d5a09b0a43a69c983154',
    }),
    __metadata("design:type", String)
], CreateTarrificationDto.prototype, "defaultTva", void 0);
//# sourceMappingURL=create-tarrification.dto.js.map