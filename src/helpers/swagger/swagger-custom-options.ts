import { SwaggerConstants } from '@/app.constants';
import { INestApplication } from '@nestjs/common';

export function getCustomSwaggerOptions(app: INestApplication) {
  return {
    customSiteTitle: SwaggerConstants.customTitle,
    // customJs: '../../swagger-custom.js',
    // customCssUrl: '../../swagger-custom.css',
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 1,
      defaultModelRendering: 'model',
      displayRequestDuration: true,
      filter: true,
      persistAuthorization: true,
      tryItOutEnabled: true,
      explore: true,
    },
  };
}
