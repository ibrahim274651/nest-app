"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const pipeline_1 = require("./pipeline");
const path_1 = require("path");
const test_module_1 = require("./grpc-test/test.module");
const grpc_api_module_1 = require("./grpc/grpc-api.module");
const app_helpers_module_1 = require("./helpers/app.helpers.module");
const keycloak_server_module_1 = require("./helpers/keycloak-config/keycloak.server.module");
const serve_static_1 = require("@nestjs/serve-static");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URL || ''),
            serve_static_1.ServeStaticModule.forRoot({ rootPath: (0, path_1.join)(__dirname, '..', 'uploads') }),
            test_module_1.TestModule,
            grpc_api_module_1.GrpcApiModule,
            app_helpers_module_1.AppHelpersModule,
            keycloak_server_module_1.KeyCloakServerModule,
        ],
        controllers: [],
        providers: [pipeline_1.PipelineService],
        exports: [pipeline_1.PipelineService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map