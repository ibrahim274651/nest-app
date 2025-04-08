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
var VerificationService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_i18n_service_1 = require("src/helpers/translate/server-response/response-i18n.service");
const promotion_entity_1 = require("./bases/promotions/entities/promotion.entity");
const tarrification_entity_1 = require("./bases/tarrification/entities/tarrification.entity");
const accompagnement_entity_1 = require("./produits/accompagnements/entities/accompagnement.entity");
const article_entity_1 = require("./produits/articles/entities/article.entity");
const category_entity_1 = require("./produits/categories/entities/category.entity");
const cuisson_entity_1 = require("./produits/cuissons/entities/cuisson.entity");
const menu_entity_1 = require("./produits/menus/entities/menu.entity");
let VerificationService = VerificationService_1 = class VerificationService {
    categoryModel;
    itemModel;
    accModel;
    menuModel;
    cuissonModel;
    tarModel;
    promoModel;
    responseI18nService;
    logger = new common_1.Logger(VerificationService_1.name);
    constructor(categoryModel, itemModel, accModel, menuModel, cuissonModel, tarModel, promoModel, responseI18nService) {
        this.categoryModel = categoryModel;
        this.itemModel = itemModel;
        this.accModel = accModel;
        this.menuModel = menuModel;
        this.cuissonModel = cuissonModel;
        this.tarModel = tarModel;
        this.promoModel = promoModel;
        this.responseI18nService = responseI18nService;
    }
    async isCatalogueUsed(id) {
        try {
            const [category, item, acc, cuisson] = await Promise.all([
                this.categoryModel.exists({ 'catalogue.id': id }),
                this.itemModel.exists({ 'catalogue.id': id }),
                this.accModel.exists({ 'catalogue.id': id }),
                this.cuissonModel.exists({ 'catalogue.id': id }),
            ]);
            const modelsInUse = [];
            if (category)
                modelsInUse.push('Category');
            if (item)
                modelsInUse.push('Item');
            if (acc)
                modelsInUse.push('AddOns');
            if (cuisson)
                modelsInUse.push('Cuisson');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This catalog is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking catalogue usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async checkImageUsage(imageUrl) {
        try {
            const modelsInUse = [];
            const [category, article, acc, cuisson] = await Promise.all([
                this.categoryModel.findOne({ 'catalogue.image': imageUrl }),
                this.itemModel.findOne({ 'catalogue.image': imageUrl }),
                this.accModel.findOne({ 'catalogue.image': imageUrl }),
                this.cuissonModel.findOne({ 'catalogue.image': imageUrl }),
            ]);
            if (category)
                modelsInUse.push('Category');
            if (article)
                modelsInUse.push('Item');
            if (acc)
                modelsInUse.push('Addons');
            if (cuisson)
                modelsInUse.push('Cuisson');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`These catalog image(s) are in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking image usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async isCategoryUsed(id) {
        try {
            const [item, acc, menu] = await Promise.all([
                this.itemModel.exists({ categorie: id }),
                this.accModel.exists({ categorie: id }),
                this.menuModel.exists({ categorie: id }),
            ]);
            const modelsInUse = [];
            if (item)
                modelsInUse.push('Item');
            if (acc)
                modelsInUse.push('AddOns');
            if (menu)
                modelsInUse.push('Menu');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This category is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking category usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async isTvaUsed(id) {
        try {
            const [tarif, item, acc, menu] = await Promise.all([
                this.tarModel.exists({ defaultTva: id }),
                this.itemModel.exists({ 'tarification.tvaId': id }),
                this.accModel.exists({ 'tarification.tvaId': id }),
                this.menuModel.exists({ 'tarification.tvaId': id }),
            ]);
            const modelsInUse = [];
            if (tarif)
                modelsInUse.push('Tarification');
            if (item)
                modelsInUse.push('Item');
            if (acc)
                modelsInUse.push('AddOns');
            if (menu)
                modelsInUse.push('Menu');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This Tva is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking category usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async isTarificationUsed(id) {
        try {
            const [cat, item, acc, menu] = await Promise.all([
                this.categoryModel.exists({ tarification: id }),
                this.itemModel.exists({ 'tarification.tarificationId': id }),
                this.accModel.exists({ 'tarification.tarificationId': id }),
                this.menuModel.exists({ 'tarification.tarificationId': id }),
            ]);
            const modelsInUse = [];
            if (cat)
                modelsInUse.push('Category');
            if (item)
                modelsInUse.push('Item');
            if (acc)
                modelsInUse.push('AddOns');
            if (menu)
                modelsInUse.push('Menu');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This tarification is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking tarification usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async isFabricationUsed(id) {
        try {
            const itemExists = await this.itemModel.exists({
                'fabrication.fabricationId': id,
            });
            const modelsInUse = [];
            if (itemExists)
                modelsInUse.push('Item');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This fabrication is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking fabrication usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async isUniteUsed(id) {
        try {
            const itemExists = await this.itemModel.exists({
                'uniteDetails.unite': id,
            });
            const modelsInUse = [];
            if (itemExists)
                modelsInUse.push('Item');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This unite of measurement is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking unite usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async isItemUsed(id) {
        try {
            const [promotion, menu, mvt, tansfert, inventory] = await Promise.all([
                this.promoModel.exists({ 'articles.articleId': id }),
                this.menuModel.exists({
                    niveaux: { $elemMatch: { articleIds: id } },
                }),
            ]);
            const modelsInUse = [];
            if (promotion)
                modelsInUse.push('Promotion');
            if (menu)
                modelsInUse.push('Menu');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This item is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking item usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
    async isMenuStageUsed(id) {
        try {
            const menuExists = await this.menuModel.exists({
                niveaux: { $elemMatch: { niveauId: id } },
            });
            const modelsInUse = [];
            if (menuExists)
                modelsInUse.push('Menu');
            if (modelsInUse.length > 0) {
                throw new common_1.ConflictException(`This menu stage is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`);
            }
        }
        catch (error) {
            this.logger.error('Error checking menu stage usage:', error);
            throw this.responseI18nService.handleError(error);
        }
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = VerificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(article_entity_1.Article.name)),
    __param(2, (0, mongoose_1.InjectModel)(accompagnement_entity_1.Accompagnement.name)),
    __param(3, (0, mongoose_1.InjectModel)(menu_entity_1.Menu.name)),
    __param(4, (0, mongoose_1.InjectModel)(cuisson_entity_1.Cuisson.name)),
    __param(5, (0, mongoose_1.InjectModel)(tarrification_entity_1.Tarrification.name)),
    __param(6, (0, mongoose_1.InjectModel)(promotion_entity_1.Promotion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, typeof (_a = typeof response_i18n_service_1.ResponseI18nService !== "undefined" && response_i18n_service_1.ResponseI18nService) === "function" ? _a : Object])
], VerificationService);
//# sourceMappingURL=verification.service.js.map