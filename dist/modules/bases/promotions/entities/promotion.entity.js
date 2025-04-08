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
exports.PromotionSchema = exports.Promotion = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_embedabble_1 = require("../../../../common/article.embedabble");
const common_1 = require("@nestjs/common");
let Promotion = class Promotion extends mongoose_2.Document {
    designation;
    quantite;
    bonus;
    dateDebut;
    dateFin;
    periodeIllimite;
    articles;
};
exports.Promotion = Promotion;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Promotion.prototype, "designation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Promotion.prototype, "quantite", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false, default: 0 }),
    __metadata("design:type", Number)
], Promotion.prototype, "bonus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Promotion.prototype, "dateDebut", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Promotion.prototype, "dateFin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false, required: false }),
    __metadata("design:type", Boolean)
], Promotion.prototype, "periodeIllimite", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [article_embedabble_1.NestedArticleSchema], required: false, default: [] }),
    __metadata("design:type", Array)
], Promotion.prototype, "articles", void 0);
exports.Promotion = Promotion = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Promotion);
exports.PromotionSchema = mongoose_1.SchemaFactory.createForClass(Promotion);
exports.PromotionSchema.pre('save', async function (next) {
    try {
        const existingPromotions = await this.model(Promotion.name).find({
            designation: this.designation,
            dateDebut: this.dateDebut,
            dateFin: this.dateFin,
        });
        if (existingPromotions.length > 0) {
            return next(new common_1.ConflictException({
                message: 'Une promotion avec les mêmes dates existe déjà',
                statusCode: common_1.HttpStatus.CONFLICT,
            }));
        }
        if (!this.periodeIllimite && (!this.dateDebut || !this.dateFin)) {
            return next(new common_1.BadRequestException({
                message: 'Date de début et date de fin sont obligatoires pour une promotion limitée',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            }));
        }
        if (this.articles && Array.isArray(this.articles)) {
            for (const article of this.articles) {
                if (article.offert && this.bonus === 0) {
                    return next(new common_1.BadRequestException({
                        message: 'Le bonus doit être supérieur à 0 lorsque "offert" est activé.',
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                    }));
                }
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=promotion.entity.js.map