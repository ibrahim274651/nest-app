import { Global, Module } from '@nestjs/common';
import * as path from 'path';
import { ResponseI18nService } from './server-response/response-i18n.service';
import { TranslateService } from './translate.service';
import {
  I18nModule,
  QueryResolver,
  AcceptLanguageResolver,
  HeaderResolver,
} from 'nestjs-i18n';

const i18nPath = path.join(__dirname, '../../helpers/translate');
const typeSafety = path.join(
  __dirname,
  '../../../src/helpers/translate/generated/i18n.generated.ts',
);

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: i18nPath,
        watch: true,
      },
      typesOutputPath: typeSafety,
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
  providers: [TranslateService, ResponseI18nService],
  exports: [TranslateService, ResponseI18nService],
})
export class TranslateModule {}
