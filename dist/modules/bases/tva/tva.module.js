"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TvaModule = void 0;
const common_1 = require("@nestjs/common");
const tva_service_1 = require("./tva.service");
const tva_controller_1 = require("./tva.controller");
const mongoose_1 = require("@nestjs/mongoose");
const tva_entity_1 = require("./entities/tva.entity");
let TvaModule = class TvaModule {
};
exports.TvaModule = TvaModule;
exports.TvaModule = TvaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: tva_entity_1.Tva.name, schema: tva_entity_1.TvaSchema }])],
        controllers: [tva_controller_1.TvaController],
        providers: [tva_service_1.TvaService],
        exports: [tva_service_1.TvaService, mongoose_1.MongooseModule],
    })
], TvaModule);
//# sourceMappingURL=tva.module.js.map