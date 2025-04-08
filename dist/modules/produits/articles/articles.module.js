"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModule = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const articles_controller_1 = require("./articles.controller");
const mongoose_1 = require("@nestjs/mongoose");
const article_entity_1 = require("./entities/article.entity");
const other_sale_service_1 = require("./services/other-sale.service");
const other_test_service_1 = require("./services/other-test.service");
let ArticlesModule = class ArticlesModule {
};
exports.ArticlesModule = ArticlesModule;
exports.ArticlesModule = ArticlesModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: article_entity_1.Article.name,
                    schema: article_entity_1.articleSchema,
                },
            ]),
        ],
        controllers: [articles_controller_1.ArticlesController],
        providers: [articles_service_1.ArticlesService, other_sale_service_1.ItemForSaleService, other_test_service_1.ItemForTestService],
        exports: [mongoose_1.MongooseModule, articles_service_1.ArticlesService, other_sale_service_1.ItemForSaleService],
    })
], ArticlesModule);
//# sourceMappingURL=articles.module.js.map