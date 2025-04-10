import { Global, Module } from '@nestjs/common';
import { AppHelperService } from './app.helper.service';
import { TranslateModule } from './translate/translate.module';
import { ResponseHelpersModule } from './response-helpers/response-helpers.module';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [TranslateModule, ResponseHelpersModule],
  controllers: [],
  providers: [AppHelperService, JwtService],
  exports: [AppHelperService, JwtService],
})
export class AppHelpersModule {}
