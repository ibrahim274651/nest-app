"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricationModule = void 0;
const common_1 = require("@nestjs/common");
const fabrication_service_1 = require("./fabrication.service");
const fabrication_controller_1 = require("./fabrication.controller");
const fabrication_entity_1 = require("./entities/fabrication.entity");
const mongoose_1 = require("@nestjs/mongoose");
let FabricationModule = class FabricationModule {
};
exports.FabricationModule = FabricationModule;
exports.FabricationModule = FabricationModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: fabrication_entity_1.Fabrication.name,
                    schema: fabrication_entity_1.FabricationSchema,
                },
            ]),
        ],
        controllers: [fabrication_controller_1.FabricationController],
        providers: [fabrication_service_1.FabricationService],
        exports: [mongoose_1.MongooseModule, fabrication_service_1.FabricationService],
    })
], FabricationModule);
//# sourceMappingURL=fabrication.module.js.map