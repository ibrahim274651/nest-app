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
exports.ResponseDataDTO = exports.ResponseDataPagianationDto = exports.DataPagination = exports.ResponseDataDto = exports.ErrorDto = exports.ResponsePaginateBycountryDto = exports.ResponseStorePaginateDto = exports.ResponsePaginateDto = exports.ResponseData = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
const class_validator_2 = require("class-validator");
class ResponseData {
    statusCode;
    message;
    data;
    errors;
}
exports.ResponseData = ResponseData;
class ResponsePaginateDto {
    page = 1;
    limit = 10;
}
exports.ResponsePaginateDto = ResponsePaginateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ResponsePaginateDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ResponsePaginateDto.prototype, "limit", void 0);
class ResponseStorePaginateDto extends ResponsePaginateDto {
    storeId;
}
exports.ResponseStorePaginateDto = ResponseStorePaginateDto;
__decorate([
    (0, swagger_2.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ResponseStorePaginateDto.prototype, "storeId", void 0);
class ResponsePaginateBycountryDto extends ResponsePaginateDto {
    country;
}
exports.ResponsePaginateBycountryDto = ResponsePaginateBycountryDto;
__decorate([
    (0, swagger_2.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ResponsePaginateBycountryDto.prototype, "country", void 0);
class ErrorDto {
    message;
    field;
}
exports.ErrorDto = ErrorDto;
__decorate([
    (0, swagger_2.ApiProperty)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], ErrorDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ErrorDto.prototype, "field", void 0);
class ResponseDataDto {
    statusCode;
    message;
    data;
}
exports.ResponseDataDto = ResponseDataDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'HTTP status code of the response' }),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], ResponseDataDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Description of the result or outcome of the operation',
    }),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], ResponseDataDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The payload or data associated with the response',
        type: Object,
    }),
    (0, class_validator_2.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ResponseDataDto.prototype, "data", void 0);
class DataPagination {
    content;
    total;
    limit = 10;
    page = 1;
    pageSize;
}
exports.DataPagination = DataPagination;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data of the response', type: Object }),
    __metadata("design:type", Array)
], DataPagination.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Total of the response', type: Number }),
    __metadata("design:type", Number)
], DataPagination.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Limit of the response', type: Number }),
    __metadata("design:type", Number)
], DataPagination.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Page of the response', type: Number }),
    __metadata("design:type", Number)
], DataPagination.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page size of the response',
        type: Number,
    }),
    __metadata("design:type", Number)
], DataPagination.prototype, "pageSize", void 0);
class ResponseDataPagianationDto {
    statusCode;
    message;
    data;
}
exports.ResponseDataPagianationDto = ResponseDataPagianationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'HTTP status code of the response' }),
    __metadata("design:type", Number)
], ResponseDataPagianationDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Description of the result or outcome of the operation',
    }),
    __metadata("design:type", String)
], ResponseDataPagianationDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The payload or data associated with the response',
        type: DataPagination,
    }),
    __metadata("design:type", Object)
], ResponseDataPagianationDto.prototype, "data", void 0);
class ResponseDataDTO {
    statusCode;
    message;
    data;
    errors;
}
exports.ResponseDataDTO = ResponseDataDTO;
__decorate([
    (0, swagger_2.ApiProperty)({
        description: 'HTTP status code of the response',
        example: 200,
    }),
    __metadata("design:type", Number)
], ResponseDataDTO.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: 'Descriptive message providing more details about the response',
        example: 'Operation completed successfully',
    }),
    __metadata("design:type", String)
], ResponseDataDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: 'The actual data returned by the API, could be of any type',
        example: {},
        required: false,
    }),
    __metadata("design:type", Object)
], ResponseDataDTO.prototype, "data", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: 'List of errors, if any occurred during the request handling',
        example: [{ message: 'Invalid input data', field: 'name' }],
        required: false,
        type: [Object],
    }),
    __metadata("design:type", Array)
], ResponseDataDTO.prototype, "errors", void 0);
//# sourceMappingURL=utils.js.map