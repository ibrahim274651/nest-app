"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarrificationModule = void 0;
const common_1 = require("@nestjs/common");
const tarrification_service_1 = require("./tarrification.service");
const tarrification_controller_1 = require("./tarrification.controller");
const mongoose_1 = require("@nestjs/mongoose");
const tarrification_entity_1 = require("./entities/tarrification.entity");
let TarrificationModule = class TarrificationModule {
};
exports.TarrificationModule = TarrificationModule;
exports.TarrificationModule = TarrificationModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: tarrification_entity_1.Tarrification.name, schema: tarrification_entity_1.TarrificationSchema },
            ]),
        ],
        controllers: [tarrification_controller_1.TarrificationController],
        providers: [tarrification_service_1.TarrificationService],
        exports: [mongoose_1.MongooseModule, tarrification_service_1.TarrificationService],
    })
], TarrificationModule);
//# sourceMappingURL=tarrification.module.js.map