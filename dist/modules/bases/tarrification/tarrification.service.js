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
var TarrificationService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarrificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tarrification_entity_1 = require("./entities/tarrification.entity");
const tva_service_1 = require("../tva/tva.service");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
let TarrificationService = TarrificationService_1 = class TarrificationService {
    tarificationModel;
    tvaService;
    responseI18nService;
    logger = new common_1.Logger(TarrificationService_1.name);
    constructor(tarificationModel, tvaService, responseI18nService) {
        this.tarificationModel = tarificationModel;
        this.tvaService = tvaService;
        this.responseI18nService = responseI18nService;
    }
    async create(createTarrificationDto) {
        try {
            if (createTarrificationDto.defaultTva) {
                const tvaExists = await this.tvaService.findOne(createTarrificationDto.defaultTva);
                if (!tvaExists) {
                    return this.responseI18nService.notFoundData('TVA');
                }
            }
            const data = await this.tarificationModel.create(createTarrificationDto);
            return this.responseI18nService.create(data, 'TARIFICATION');
        }
        catch (error) {
            this.logger.error('Error creating Tarrification:', error.message);
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
            const results = await this.tarificationModel
                .find(filter)
                .sort({ createdAt: order === 'DESC' ? -1 : 1 })
                .skip(skip)
                .limit(take ?? 10)
                .lean()
                .exec();
            const itemCount = await this.tarificationModel.countDocuments(filter);
            return this.responseI18nService.fetchWithPagination(results, itemCount, pageOptionsDto, 'TARIFICATION');
        }
        catch (error) {
            this.logger.error(error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const tarification = await this.tarificationModel.findById(id).exec();
            return this.responseI18nService.success(tarification, 'TARIFICATION');
        }
        catch (error) {
            console.error('Error retrieving Tarrification:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async findByConsomation(tarif) {
        try {
            const filter = {};
            if (tarif?.mode) {
                filter.modeConsommation = tarif.mode;
            }
            const tarification = await this.tarificationModel.find(filter).exec();
            return this.responseI18nService.fetchAll(tarification, 'TARIFICATION');
        }
        catch (error) {
            console.error('Error retrieving Tarrification:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async update(id, updateTarrificationDto) {
        try {
            const updatedTarification = await this.tarificationModel
                .findByIdAndUpdate(id, updateTarrificationDto, { new: true })
                .exec();
            if (!updatedTarification) {
                return this.responseI18nService.notFoundData('TARIFICATION');
            }
            return this.responseI18nService.update(updatedTarification, 'TARIFICATION');
        }
        catch (error) {
            this.logger.error('Error updating Tarrification:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const deletedTarification = await this.tarificationModel
                .findByIdAndDelete(id)
                .exec();
            if (!deletedTarification) {
                return this.responseI18nService.notFoundData('TARIFICATION');
            }
            return this.responseI18nService.delete(deletedTarification, 'TARIFICATION');
        }
        catch (error) {
            this.logger.error('Error deleting Tarrification:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async findTarrification() {
        try {
            const query = await this.tarificationModel.find().populate('defaultTva');
            return this.responseI18nService.success(query, 'TARIFICATION');
        }
        catch (error) {
            return this.responseI18nService.handleError(error);
        }
    }
    async getTarificationAndTvas() {
        try {
            const [tvas, tarrifications] = await Promise.all([
                this.tvaService.findTva(),
                this.findTarrification(),
            ]);
            const dropdownData = tarrifications.data.map((tarrification) => {
                return {
                    _id: tarrification._id,
                    designation: tarrification.designation,
                    modeConsommation: tarrification.modeConsommation,
                    defaultTva: tarrification.defaultTva?._id,
                    tvas: tvas.data.map((tva) => ({
                        _id: tva._id,
                        designation: tva.designation,
                        taux: tva.taux,
                        isDefault: tarrification.defaultTva?._id.toString() === tva._id.toString(),
                    })),
                };
            });
            return this.responseI18nService.success(dropdownData, 'TARIFICATION');
        }
        catch (error) {
            return this.responseI18nService.handleError(error);
        }
    }
    async validateTvaAndTarification(tarifications) {
        if (!tarifications.tarificationId || !tarifications.tvaId) {
            throw this.responseI18nService.badRequest('TARIFICATION.invalidId');
        }
        const tarification = await this.findOne(tarifications.tarificationId);
        if (!tarification || !tarification.data?._id) {
            throw this.responseI18nService.notFoundData('TARIFICATION');
        }
        const tva = await this.tvaService.findOne(tarifications.tvaId);
        if (!tva || !tva.data?._id) {
            throw this.responseI18nService.notFoundData('TVA');
        }
        const validation = {
            tarification: tarification.data,
            tva: tva.data,
            caisse: tarifications.caisse,
            prixTTC: tarifications.prixTTC,
            prixHT: tarifications.prixHT,
        };
        return validation;
    }
    async validateMultipleTvasAndTarifications(tarifications) {
        try {
            const tvaIds = tarifications.map((tarif) => {
                return tarif.tvaId;
            });
            const tarificationIds = tarifications.map((tarif) => tarif.tarificationId);
            const [existingTvas, existingTarifs] = await Promise.all([
                Promise.all(tvaIds.map((id) => this.tvaService.findOne(id))),
                Promise.all(tarificationIds.map((id) => this.findOne(id))),
            ]);
            for (const tarif of tarifications) {
                const foundTva = existingTvas.find((t) => t && t.data?._id.toString() === tarif.tvaId);
                if (!foundTva || !foundTva.data?._id) {
                    throw this.responseI18nService.notFoundData('TVA');
                }
                const foundTarif = existingTarifs.find((t) => t && t.data?._id.toString() === tarif.tarificationId);
                if (!foundTarif || !foundTarif.data?._id) {
                    throw this.responseI18nService.notFoundData('TARIFICATION');
                }
            }
            const results = await Promise.all(tarifications.map((tarif) => this.validateTvaAndTarification(tarif)));
            const tarificationId = results.map((item) => item.tarification._id);
            const tvaId = results.map((item) => item.tva._id);
            return tarifications.map((item, index) => ({
                tarificationId: tarificationId[index].toString(),
                tvaId: tvaId[index].toString(),
                caisse: item.caisse,
                prixTTC: item.prixTTC,
                prixHT: item.prixHT,
            }));
        }
        catch (error) {
            this.logger.error('Error validating multiple tvas and tarifications:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async validateTarificationId(ids) {
        if (!Array.isArray(ids)) {
            return this.responseI18nService.badRequest('TARIFICATION.badRequest');
        }
        try {
            const tarifications = await this.tarificationModel
                .find({ _id: { $in: ids } }, { _id: 1 })
                .lean();
            const foundIds = new Set(tarifications.map((t) => t._id.toString()));
            const missingIds = ids.filter((id) => !foundIds.has(id));
            if (missingIds.length > 0) {
                this.logger.error(`Tarification(s) with ID(s) ${missingIds.join(', ')} not found.`);
                return this.responseI18nService.notFoundData('TARIFICATION');
            }
            return Array.from(foundIds);
        }
        catch (error) {
            return this.responseI18nService.handleError(error);
        }
    }
};
exports.TarrificationService = TarrificationService;
exports.TarrificationService = TarrificationService = TarrificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tarrification_entity_1.Tarrification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        tva_service_1.TvaService, typeof (_a = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _a : Object])
], TarrificationService);
//# sourceMappingURL=tarrification.service.js.map