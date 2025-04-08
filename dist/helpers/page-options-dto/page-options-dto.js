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
exports.PageOptionsDto = exports.Order = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (exports.Order = Order = {}));
class PageOptionsDto {
    order = Order.ASC;
    page = 1;
    take = 10;
    search;
    get skip() {
        return ((this.page ?? 1) - 1) * (this.take ?? 10);
    }
}
exports.PageOptionsDto = PageOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: Order, default: Order.ASC }),
    (0, class_validator_1.IsEnum)(Order),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        default: 1,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 50,
        default: 10,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: null,
        description: 'Search keyword for filtering results',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of items to skip',
    }),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], PageOptionsDto.prototype, "skip", null);
//# sourceMappingURL=page-options-dto.js.map