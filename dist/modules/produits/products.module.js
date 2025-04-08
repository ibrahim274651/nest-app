"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const accompagnements_module_1 = require("./accompagnements/accompagnements.module");
const articles_module_1 = require("./articles/articles.module");
const categories_module_1 = require("./categories/categories.module");
const cuissons_module_1 = require("./cuissons/cuissons.module");
const fabrication_module_1 = require("./fabrication/fabrication.module");
const menus_module_1 = require("./menus/menus.module");
const catalogue_module_1 = require("./catalogue/catalogue.module");
const utils_contoller_1 = require("src/utils/controller/utils.contoller");
const menu_stage_module_1 = require("./menu-stage/menu-stage.module");
const unite_mesure_module_1 = require("./unite-mesure/unite-mesure.module");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            catalogue_module_1.CatalogueModule,
            categories_module_1.CategoriesModule,
            unite_mesure_module_1.UniteMesureModule,
            articles_module_1.ArticlesModule,
            menu_stage_module_1.MenuStageModule,
            menus_module_1.MenusModule,
            accompagnements_module_1.AccompagnementsModule,
            cuissons_module_1.CuissonsModule,
            fabrication_module_1.FabricationModule,
        ],
        controllers: [utils_contoller_1.EnumTypeController],
        providers: [],
        exports: [],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map