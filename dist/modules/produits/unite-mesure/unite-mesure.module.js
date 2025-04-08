"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniteMesureModule = void 0;
const common_1 = require("@nestjs/common");
const unite_mesure_service_1 = require("./unite-mesure.service");
const unite_mesure_controller_1 = require("./unite-mesure.controller");
const mongoose_1 = require("@nestjs/mongoose");
const unite_mesure_entity_1 = require("./entities/unite-mesure.entity");
let UniteMesureModule = class UniteMesureModule {
};
exports.UniteMesureModule = UniteMesureModule;
exports.UniteMesureModule = UniteMesureModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: unite_mesure_entity_1.UniteMesure.name, schema: unite_mesure_entity_1.uniteMesureSchema },
            ]),
        ],
        controllers: [unite_mesure_controller_1.UniteMesureController],
        providers: [unite_mesure_service_1.UniteMesureService],
        exports: [mongoose_1.MongooseModule, unite_mesure_service_1.UniteMesureService],
    })
], UniteMesureModule);
//# sourceMappingURL=unite-mesure.module.js.map