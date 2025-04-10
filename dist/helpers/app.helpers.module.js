"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHelpersModule = void 0;
const common_1 = require("@nestjs/common");
const app_helper_service_1 = require("./app.helper.service");
const translate_module_1 = require("./translate/translate.module");
const response_helpers_module_1 = require("./response-helpers/response-helpers.module");
const jwt_1 = require("@nestjs/jwt");
let AppHelpersModule = class AppHelpersModule {
};
exports.AppHelpersModule = AppHelpersModule;
exports.AppHelpersModule = AppHelpersModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [translate_module_1.TranslateModule, response_helpers_module_1.ResponseHelpersModule],
        controllers: [],
        providers: [app_helper_service_1.AppHelperService, jwt_1.JwtService],
        exports: [app_helper_service_1.AppHelperService, jwt_1.JwtService],
    })
], AppHelpersModule);
//# sourceMappingURL=app.helpers.module.js.map