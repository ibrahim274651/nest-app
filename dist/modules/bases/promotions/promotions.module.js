"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsModule = void 0;
const common_1 = require("@nestjs/common");
const promotions_service_1 = require("./promotions.service");
const promotions_controller_1 = require("./promotions.controller");
const promotion_entity_1 = require("./entities/promotion.entity");
const mongoose_1 = require("@nestjs/mongoose");
let PromotionsModule = class PromotionsModule {
};
exports.PromotionsModule = PromotionsModule;
exports.PromotionsModule = PromotionsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: promotion_entity_1.Promotion.name,
                    schema: promotion_entity_1.PromotionSchema,
                },
            ]),
        ],
        controllers: [promotions_controller_1.PromotionsController],
        providers: [promotions_service_1.PromotionsService],
        exports: [promotions_service_1.PromotionsService, mongoose_1.MongooseModule],
    })
], PromotionsModule);
//# sourceMappingURL=promotions.module.js.map