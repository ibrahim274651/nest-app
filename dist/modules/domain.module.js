"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainModule = void 0;
const common_1 = require("@nestjs/common");
const tva_module_1 = require("./tva/tva.module");
const config_1 = require("@nestjs/config");
const catalogue_module_1 = require("./catalogue/catalogue.module");
const tarification_module_1 = require("./tarification/tarification.module");
const verification_service_1 = require("./verification.service");
const promotions_module_1 = require("./promotions/promotions.module");
const articles_module_1 = require("./articles/articles.module");
const categories_module_1 = require("./categories/categories.module");
const cuissons_module_1 = require("./cuissons/cuissons.module");
const fabrication_module_1 = require("./fabrication/fabrication.module");
const menu_stage_module_1 = require("./menu-stage/menu-stage.module");
const menus_module_1 = require("./menus/menus.module");
const unite_mesure_module_1 = require("./unite-mesure/unite-mesure.module");
const accompagnements_module_1 = require("./accompagnements/accompagnements.module");
const pipeline_1 = require("../pipeline");
let DomainModule = class DomainModule {
};
exports.DomainModule = DomainModule;
exports.DomainModule = DomainModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            tva_module_1.TvaModule,
            tarification_module_1.TarificationModule,
            promotions_module_1.PromotionModule,
            catalogue_module_1.CatalogueModule,
            categories_module_1.CategorieModule,
            unite_mesure_module_1.UniteMesureModule,
            articles_module_1.ArticleModule,
            menu_stage_module_1.MenuStageModule,
            menus_module_1.MenuModule,
            accompagnements_module_1.AccompagnementModule,
            cuissons_module_1.CuissonModule,
            fabrication_module_1.FabricationModule,
        ],
        controllers: [],
        providers: [verification_service_1.VerificationService, pipeline_1.PipelineService],
        exports: [verification_service_1.VerificationService, pipeline_1.PipelineService],
    })
], DomainModule);
//# sourceMappingURL=domain.module.js.map