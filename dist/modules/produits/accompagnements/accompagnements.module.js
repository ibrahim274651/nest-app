"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccompagnementsModule = void 0;
const common_1 = require("@nestjs/common");
const accompagnements_service_1 = require("./accompagnements.service");
const accompagnements_controller_1 = require("./accompagnements.controller");
const accompagnement_entity_1 = require("./entities/accompagnement.entity");
const mongoose_1 = require("@nestjs/mongoose");
let AccompagnementsModule = class AccompagnementsModule {
};
exports.AccompagnementsModule = AccompagnementsModule;
exports.AccompagnementsModule = AccompagnementsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: accompagnement_entity_1.Accompagnement.name,
                    schema: accompagnement_entity_1.AccompagnementSchema,
                },
            ]),
        ],
        controllers: [accompagnements_controller_1.AccompagnementsController],
        providers: [accompagnements_service_1.AccompagnementsService],
        exports: [mongoose_1.MongooseModule, accompagnements_service_1.AccompagnementsService],
    })
], AccompagnementsModule);
//# sourceMappingURL=accompagnements.module.js.map