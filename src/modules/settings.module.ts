import { Global, Module } from '@nestjs/common';
import { BasesModule } from './bases/bases.module';
import { AppFunctionService } from './settings.service';
import { SettingsController } from './settings.controller';
import { ArticlesModule } from './produits/articles/articles.module';
import { MouvementModule } from 'src/mouvements-stock/mouvement/mouvement.module';

@Global()
@Module({
  imports: [BasesModule, ArticlesModule, MouvementModule],
  providers: [AppFunctionService],
  controllers: [SettingsController],
  exports: [AppFunctionService],
})
export class SettingsModule {}
