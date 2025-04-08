import { INestApplication } from '@nestjs/common';
export declare function getCustomSwaggerOptions(app: INestApplication): {
    customSiteTitle: any;
    swaggerOptions: {
        docExpansion: string;
        defaultModelsExpandDepth: number;
        defaultModelRendering: string;
        displayRequestDuration: boolean;
        filter: boolean;
        persistAuthorization: boolean;
        tryItOutEnabled: boolean;
        explore: boolean;
    };
};
