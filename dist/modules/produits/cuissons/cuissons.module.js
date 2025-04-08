"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuissonsModule = void 0;
const common_1 = require("@nestjs/common");
const cuissons_service_1 = require("./cuissons.service");
const cuissons_controller_1 = require("./cuissons.controller");
const cuisson_entity_1 = require("./entities/cuisson.entity");
const mongoose_1 = require("@nestjs/mongoose");
let CuissonsModule = class CuissonsModule {
};
exports.CuissonsModule = CuissonsModule;
exports.CuissonsModule = CuissonsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: cuisson_entity_1.Cuisson.name,
                    schema: cuisson_entity_1.CuissonSchema,
                },
            ]),
        ],
        controllers: [cuissons_controller_1.CuissonsController],
        providers: [cuissons_service_1.CuissonsService],
        exports: [mongoose_1.MongooseModule, cuissons_service_1.CuissonsService],
    })
], CuissonsModule);
//# sourceMappingURL=cuissons.module.js.map