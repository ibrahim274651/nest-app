"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcApiModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const external_grpc_api_service_1 = require("./external-grpc-api.service");
const external_grpc_api_controller_1 = require("./external-grpc-api.controller");
let GrpcApiModule = class GrpcApiModule {
};
exports.GrpcApiModule = GrpcApiModule;
exports.GrpcApiModule = GrpcApiModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'PARAMETER_SERVICE_PACKAGE',
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: 'localhost:50050',
                        package: 'fiscalYear',
                        protoPath: (0, path_1.join)(__dirname, 'proto/fiscalYear.proto'),
                    },
                },
            ]),
        ],
        controllers: [external_grpc_api_controller_1.ExternalGrpcApiController],
        providers: [external_grpc_api_service_1.ExternalGrpcApiService],
        exports: [microservices_1.ClientsModule, external_grpc_api_service_1.ExternalGrpcApiService],
    })
], GrpcApiModule);
//# sourceMappingURL=grpc-api.module.js.map