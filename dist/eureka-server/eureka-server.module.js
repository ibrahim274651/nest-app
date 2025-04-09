"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EurekaServerModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_eureka_1 = require("nestjs-eureka");
let EurekaServerModule = class EurekaServerModule {
};
exports.EurekaServerModule = EurekaServerModule;
exports.EurekaServerModule = EurekaServerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_eureka_1.EurekaModule.forRoot({
                eureka: {
                    host: 'payall-serveur-decouverte-service',
                    port: 8761,
                    registryFetchInterval: 3000,
                    servicePath: '/eureka/apps/',
                    maxRetries: 3,
                },
                service: {
                    name: 'payall-gestion-commande-service',
                    port: 3030,
                },
            }),
        ],
    })
], EurekaServerModule);
//# sourceMappingURL=eureka-server.module.js.map