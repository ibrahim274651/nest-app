"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasesModule = void 0;
const common_1 = require("@nestjs/common");
const utils_contoller_1 = require("src/utils/controller/utils.contoller");
const promotions_module_1 = require("./promotions/promotions.module");
const tva_module_1 = require("./tva/tva.module");
const tarrification_module_1 = require("./tarrification/tarrification.module");
let BasesModule = class BasesModule {
};
exports.BasesModule = BasesModule;
exports.BasesModule = BasesModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [tva_module_1.TvaModule, tarrification_module_1.TarrificationModule, promotions_module_1.PromotionsModule],
        controllers: [utils_contoller_1.EnumTypeController],
        providers: [],
        exports: [],
    })
], BasesModule);
//# sourceMappingURL=bases.module.js.map