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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TvaService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TvaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tva_entity_1 = require("./entities/tva.entity");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
let TvaService = TvaService_1 = class TvaService {
    tvaModel;
    responseI18nService;
    logger = new common_1.Logger(TvaService_1.name);
    constructor(tvaModel, responseI18nService) {
        this.tvaModel = tvaModel;
        this.responseI18nService = responseI18nService;
    }
    async create(createTvaDto) {
        try {
            const createdTva = await this.tvaModel.create(createTvaDto);
            return this.responseI18nService.create(createdTva, 'TVA');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findAll(pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        try {
            const filter = {};
            if (search) {
                filter.designation = { $regex: search, $options: 'i' };
            }
            const results = await this.tvaModel
                .find(filter)
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take ?? 10)
                .lean()
                .exec();
            const itemCount = await this.tvaModel.countDocuments(filter);
            return this.responseI18nService.fetchWithPagination(results, itemCount, pageOptionsDto, 'TVA');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findTva() {
        try {
            const results = await this.tvaModel.find().exec();
            return this.responseI18nService.success(results, 'TVA');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const tva = await this.tvaModel.findById(id).lean().exec();
            if (!tva) {
                return this.responseI18nService.notFound();
            }
            return this.responseI18nService.success(tva, 'TVA');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async update(id, updateTvaDto) {
        try {
            const updatedTva = await this.tvaModel
                .findByIdAndUpdate(id, updateTvaDto, { new: true })
                .exec();
            if (!updatedTva) {
                return this.responseI18nService.notFound();
            }
            return this.responseI18nService.update(updatedTva, 'TVA');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const deletedTva = await this.tvaModel.findByIdAndDelete(id).exec();
            if (!deletedTva) {
                return this.responseI18nService.notFound();
            }
            return this.responseI18nService.delete(deletedTva, 'TVA');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
};
exports.TvaService = TvaService;
exports.TvaService = TvaService = TvaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tva_entity_1.Tva.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _a : Object])
], TvaService);
//# sourceMappingURL=tva.service.js.map