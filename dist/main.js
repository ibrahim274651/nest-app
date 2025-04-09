"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express_1 = require("express");
const path_1 = require("path");
const mongoose_1 = require("mongoose");
const custom_exception_1 = require("./helpers/filter/custom.exception");
const common_1 = require("@nestjs/common");
const monitoring_interceptor_1 = require("./helpers/monitoring/monitoring.interceptor");
const swagger_1 = require("./helpers/swagger/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const PORT = process.env.PORT ?? 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
    }));
    app.useGlobalInterceptors(new monitoring_interceptor_1.MonitoringInterceptor());
    app.useGlobalFilters(new custom_exception_1.GlobalExceptionFilter());
    app.setGlobalPrefix(process.env.URL_PREFIX || 'api');
    app.enableCors(corsOptions);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'src', 'uploads'), {
        prefix: '/uploads',
    });
    await app.listen(PORT, () => {
        console.log('Port is listining on :', PORT);
    });
}
void bootstrap();
//# sourceMappingURL=main.js.map