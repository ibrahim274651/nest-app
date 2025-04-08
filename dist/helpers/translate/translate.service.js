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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateService = exports.defaultLang = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const fs = require("fs");
const nestjs_i18n_1 = require("nestjs-i18n");
exports.defaultLang = 'en';
let TranslateService = class TranslateService {
    request;
    i18nService;
    constructor(request, i18nService) {
        this.request = request;
        this.i18nService = i18nService;
    }
    t(key) {
        const lang = this.lang();
        try {
            const data = fs.readFileSync(`src/helpers/translate/${lang}.json`, {
                encoding: 'utf-8',
            });
            const i18n = JSON.parse(data);
            return i18n[key] || key;
        }
        catch (err) {
            return key;
        }
    }
    translate(key, options) {
        const lang = this.lang();
        return this.i18nService.translate(key, { lang, ...options });
    }
    lang() {
        return (nestjs_i18n_1.I18nContext.current()?.lang || exports.defaultLang);
    }
};
exports.TranslateService = TranslateService;
exports.TranslateService = TranslateService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, nestjs_i18n_1.I18nService])
], TranslateService);
//# sourceMappingURL=translate.service.js.map