import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MenuStage } from './entities/menu-stage.entity';
import { Model } from 'mongoose';
import { CatalogueService } from '../catalogue/catalogue.service';
import { CreateMenuStageDto } from './dto/create-menu-stage.dto';
import { UpdateMenuStageDto } from './dto/update-menu-stage.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
// import { VerificationService } from 'src/verification.service';

@Injectable()
export class MenuStageService {
  private readonly logger = new Logger(CatalogueService.name);

  constructor(
    @InjectModel(MenuStage.name)
    private readonly menuStageModel: Model<MenuStage>,
    // private readonly verificationService: VerificationService,
    private readonly responseI18nService: ResponseI18nService,
  ) {}

  async create(createMenuStageDto: CreateMenuStageDto) {
    try {
      const created = await this.menuStageModel.create(createMenuStageDto);
      return this.responseI18nService.create(created, 'MENU_STAGE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { take, skip, order, search } = pageOptionsDto;

    try {
      const filter: any = {};
      if (search) {
        filter.designation = { $regex: search, $options: 'i' };
      }

      // Fetch filtered and sorted results
      const results = await this.menuStageModel
        .find(filter)
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take ?? 10)
        .lean()
        .exec();

      const itemCount = await this.menuStageModel.countDocuments(filter);

      return this.responseI18nService.fetchWithPagination(
        results,
        itemCount,
        pageOptionsDto,
        'MENU_STAGE',
      );
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async dropDownForMenuOption() {
    try {
      const results = await this.menuStageModel.find().lean().exec();
      return this.responseI18nService.success(results, 'MENU_STAGE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const catalogue = await this.menuStageModel.findById(id);
      if (!catalogue) {
        return this.responseI18nService.notFoundData('MENU_STAGE');
      }
      return this.responseI18nService.success(catalogue, 'MENU_STAGE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, updateMenuStageDto: UpdateMenuStageDto) {
    try {
      const catalogue = await this.menuStageModel.findById(id);
      if (!catalogue) {
        return this.responseI18nService.notFoundData('MENU_STAGE');
      }

      const query = await this.menuStageModel.findByIdAndUpdate(
        { _id: id },
        updateMenuStageDto,
      );

      return this.responseI18nService.update(query, 'MENU_STAGE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      // Check if the menu stage is being used in related models
      // const n = await this.verificationService.isMenuStageUsed(id);

      const catalogue = await this.menuStageModel.findById(id);
      if (!catalogue) {
        return this.responseI18nService.notFoundData('MENU_STAGE');
      }

      const deleted = await this.menuStageModel.findByIdAndDelete(id);
      return this.responseI18nService.delete(deleted, 'MENU_STAGE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }
}
