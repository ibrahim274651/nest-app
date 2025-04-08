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
exports.CreateTvaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTvaDto {
    designation;
    taux;
    compte_comptable_vente;
    compte_comptable_collecte;
}
exports.CreateTvaDto = CreateTvaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Designation of the TVA',
        example: 'TVA Normale',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTvaDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'TVA rate (e.g., 18 for 18%)', example: 18 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTvaDto.prototype, "taux", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sales accounting account', example: '411100' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTvaDto.prototype, "compte_comptable_vente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Collection accounting account',
        example: '445710',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTvaDto.prototype, "compte_comptable_collecte", void 0);
//# sourceMappingURL=create-tva.dto.js.map