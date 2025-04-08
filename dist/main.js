"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const path_1 = require("path");
const mongoose_1 = require("mongoose");
const custom_exception_1 = require("./helpers/filter/custom.exception");
const common_1 = require("@nestjs/common");
const monitoring_interceptor_1 = require("./helpers/monitoring/monitoring.interceptor");
const swagger_1 = require("./helpers/swagger/swagger");
const grpc_exception_filter_1 = require("./grpc/exception/grpc-exception.filter");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const PORT = process.env.PORT || 3015;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const loggerInstance = new common_1.Logger('Bootstrap');
    const corsOptions = {
        origin: '*',
        methods: '*',
        credentials: true,
    };
    (0, swagger_1.swaggerConfiguration)(app);
    mongoose_1.default.set('strictPopulate', false);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.useGlobalInterceptors(new monitoring_interceptor_1.MonitoringInterceptor());
    app.useGlobalFilters(new grpc_exception_filter_1.GrpcExceptionFilter(), new custom_exception_1.GlobalExceptionFilter());
    app.setGlobalPrefix(process.env.URL_PREFIX || 'api');
    app.enableCors(corsOptions);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'src', 'uploads'), {});
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            url: 'localhost:50051',
            package: 'stock',
            protoPath: (0, path_1.join)(__dirname, 'grpc/proto/stock.proto'),
        },
    });
    app.startAllMicroservices();
    await app.listen(PORT, () => {
        console.log('Port is listining on :', PORT);
        (0, swagger_1.swaggerLogger)(loggerInstance);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map