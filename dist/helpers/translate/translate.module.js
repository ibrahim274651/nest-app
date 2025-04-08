"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateModule = void 0;
const common_1 = require("@nestjs/common");
const translate_service_1 = require("./translate.service");
const core_1 = require("@nestjs/core");
const translate_interceptor_1 = require("./translate.interceptor");
const nestjs_i18n_1 = require("nestjs-i18n");
const path_1 = require("path");
const response_i18n_service_1 = require("./server-response/response-i18n.service");
const i18nPath = path_1.default.join(__dirname, '../../helpers/translate');
const typeSafety = path_1.default.join(__dirname, '../../../src/helpers/translate/generated/i18n.generated.ts');
let TranslateModule = class TranslateModule {
};
exports.TranslateModule = TranslateModule;
exports.TranslateModule = TranslateModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                loaderOptions: {
                    path: i18nPath,
                    watch: true,
                },
                typesOutputPath: typeSafety,
                resolvers: [
                    { use: nestjs_i18n_1.QueryResolver, options: ['lang'] },
                    nestjs_i18n_1.AcceptLanguageResolver,
                    new nestjs_i18n_1.HeaderResolver(['x-lang']),
                ],
            }),
        ],
        providers: [
            translate_service_1.TranslateService,
            response_i18n_service_1.ResponseI18nService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: translate_interceptor_1.TranslateInterceptor,
            },
        ],
        exports: [translate_service_1.TranslateService, response_i18n_service_1.ResponseI18nService],
    })
], TranslateModule);
//# sourceMappingURL=translate.module.js.map