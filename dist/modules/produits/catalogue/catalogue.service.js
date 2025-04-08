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
var CatalogueService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const catalogue_entity_1 = require("./entities/catalogue.entity");
const mongoose_2 = require("@nestjs/mongoose");
const file_upload_validate_1 = require("src/helpers/file-upload-validate/file-upload-validate");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const app_helper_service_1 = require("src/helpers/app.helper.service");
const verification_service_1 = require("src/verification.service");
let CatalogueService = CatalogueService_1 = class CatalogueService {
    catalogueDocument;
    responseI18nService;
    verificationService;
    appHelperService;
    logger = new common_1.Logger(CatalogueService_1.name);
    ipAddress = (0, app_helper_service_1.getServerIp)();
    port = process.env.PORT;
    baseUrl = `http://${this.ipAddress}:${this.port}/images/`;
    constructor(catalogueDocument, responseI18nService, verificationService, appHelperService) {
        this.catalogueDocument = catalogueDocument;
        this.responseI18nService = responseI18nService;
        this.verificationService = verificationService;
        this.appHelperService = appHelperService;
    }
    async create(createCatalogueDto, files) {
        try {
            const imageUrls = files.map((file) => file.filename);
            const updateDto = {
                ...createCatalogueDto,
                images: imageUrls,
            };
            const catalogueCatalogue = await this.catalogueDocument.create(updateDto);
            if (!catalogueCatalogue) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            return this.responseI18nService.create(catalogueCatalogue, 'CATALOGUE');
        }
        catch (error) {
            return this.responseI18nService.handleError(error);
        }
    }
    async findAll(pageOptionsDto) {
        const { take, skip, order, search } = pageOptionsDto;
        if (skip < 0 || (take && take < 1)) {
            throw this.responseI18nService.badRequest('PAGINATION');
        }
        const filter = {};
        if (search) {
            filter.designation = { $regex: search, $options: 'i' };
        }
        const results = await this.catalogueDocument
            .find(filter)
            .sort({ createdAt: order === 'DESC' ? -1 : 1 })
            .skip(skip)
            .limit(take)
            .lean()
            .exec();
        const formatData = this.appHelperService.formatImagesUploadUrl(results);
        const itemCount = await this.catalogueDocument.countDocuments(filter);
        return this.responseI18nService.fetchWithPagination(formatData, itemCount, pageOptionsDto, 'CATALOGUE');
    }
    async dropDownForCatalogue() {
        try {
            const catalogues = await this.catalogueDocument
                .find()
                .sort({ designation: 1 })
                .select('designation images')
                .lean();
            const formatData = this.appHelperService.formatImagesUploadUrl(catalogues);
            return this.responseI18nService.success(formatData, 'CATALOGUE');
        }
        catch (error) {
            this.logger.error(error);
            return this.responseI18nService.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const catalogue = await this.catalogueDocument.findById(id).lean();
            if (!catalogue) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            const formatData = this.appHelperService.formatImageUrl(catalogue);
            return this.responseI18nService.success(formatData, 'CATALOGUE');
        }
        catch (error) {
            this.logger.error(error);
            return this.responseI18nService.handleError(error);
        }
    }
    async update(id, updateCatalogueDto, files) {
        try {
            if (!files || files.length === 0 || !files[0].fieldname) {
                return this.responseI18nService.validationError({
                    key: 'MISSING',
                    fieldName: 'FILE',
                });
            }
            const imageUrls = files.map((file) => file.filename);
            const updateDto = {
                ...updateCatalogueDto,
                images: imageUrls,
            };
            const catalogue = await this.catalogueDocument.findById(id);
            if (!catalogue) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            const query = await this.catalogueDocument.findByIdAndUpdate({ _id: id }, updateDto);
            if (!query) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            return this.responseI18nService.update(query, 'CATALOGUE');
        }
        catch (error) {
            this.logger.error(error);
            return this.responseI18nService.handleError(error);
        }
    }
    async remove(id) {
        try {
            const catalogue = await this.catalogueDocument.findById(id);
            if (!catalogue) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            await this.verificationService.isCatalogueUsed(id);
            if (catalogue.images && catalogue.images.length > 0) {
                await (0, file_upload_validate_1.deleteFiles)(catalogue.images);
            }
            const deleted = await this.catalogueDocument.findByIdAndDelete(id);
            if (deleted) {
                return this.responseI18nService.delete(deleted, 'CATALOGUE');
            }
            else {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
        }
        catch (error) {
            this.logger.error('Error deleting catalogue:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    async addImageToOtherImage(id, otherImageDto, files) {
        try {
            this.validateFiles(files);
            const imageUrls = this.mapFileUrls(files);
            otherImageDto.images = imageUrls;
            const catalogue = await this.catalogueDocument.findOne({ _id: id });
            if (!catalogue) {
                await this.handleCatalogueNotFound(imageUrls);
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            catalogue.images = [...catalogue.images, ...imageUrls];
            const created = await catalogue.save();
            if (!created) {
                await (0, file_upload_validate_1.deleteFiles)(catalogue.images);
            }
            const formattedData = this.appHelperService.formatImageUrl(catalogue.toObject());
            return this.responseI18nService.update(formattedData, 'CATALOGUE');
        }
        catch (error) {
            console.error(error);
            await this.handleError(files, error);
            return this.responseI18nService.handleError(error);
        }
    }
    async deleteImageFromOtherImage(id, dto) {
        try {
            const catalogue = await this.catalogueDocument.findById(id);
            if (!catalogue) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            const urlImg = dto.url.replace(this.baseUrl, '');
            await this.verificationService.checkImageUsage(urlImg);
            const imageIndex = catalogue.images.indexOf(urlImg);
            if (imageIndex === -1) {
                return this.responseI18nService.notFoundData('CATALOGUE');
            }
            catalogue.images = catalogue.images.filter((item, index) => index !== imageIndex);
            await catalogue.save();
            return this.responseI18nService.update(catalogue, 'CATALOGUE');
        }
        catch (error) {
            this.logger.error('Error deleting image from other images:', error);
            return this.responseI18nService.handleError(error);
        }
    }
    validateFiles(files) {
        if (!files || !Array.isArray(files) || files.length === 0) {
            throw new Error('No files uploaded');
        }
    }
    mapFileUrls(images) {
        return images.map((file) => file.filename);
    }
    async handleCatalogueNotFound(imageUrls) {
        await (0, file_upload_validate_1.deleteFiles)(imageUrls);
    }
    async updateCatalogueImages(catalogue, imageUrls) {
        catalogue.images.push(...imageUrls);
        const updatedCatalogue = await catalogue.save();
        if (!updatedCatalogue) {
            throw new Error('Failed to save updated catalogue');
        }
    }
    async handleError(files, error) {
        if (files && Array.isArray(files)) {
            const fileNames = files.map((file) => file.filename);
            await (0, file_upload_validate_1.deleteFiles)(fileNames);
        }
        else {
            this.logger.warn('No files to delete');
        }
        this.logger.error('Error adding image to catalogue:', error);
    }
};
exports.CatalogueService = CatalogueService;
exports.CatalogueService = CatalogueService = CatalogueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(catalogue_entity_1.Catalogue.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, typeof (_a = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _a : Object, typeof (_b = typeof verification_service_1.VerificationService !== "undefined" && verification_service_1.VerificationService) === "function" ? _b : Object, typeof (_c = typeof app_helper_service_1.AppHelperService !== "undefined" && app_helper_service_1.AppHelperService) === "function" ? _c : Object])
], CatalogueService);
//# sourceMappingURL=catalogue.service.js.map