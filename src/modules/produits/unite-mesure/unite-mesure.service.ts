import { Injectable, Logger } from '@nestjs/common';
import { CreateUniteMesureDto } from './dto/create-unite-mesure.dto';
import { UpdateUniteMesureDto } from './dto/update-unite-mesure.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UniteMesure } from './entities/unite-mesure.entity';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { VerificationService } from 'src/verification.service';

@Injectable()
export class UniteMesureService {
  private readonly logger = new Logger(UniteMesureService.name);

  constructor(
    @InjectModel(UniteMesure.name) private uniteMesureModel: Model<UniteMesure>,
    private readonly verificationService: VerificationService,
    private readonly responseI18nService: ResponseI18nService,
  ) {}

  async create(createUniteMesureDto: CreateUniteMesureDto) {
    try {
      const uniteMesure =
        await this.uniteMesureModel.create(createUniteMesureDto);
      return this.responseI18nService.create(uniteMesure, 'UNITE_MESURE');
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

      const results = await this.uniteMesureModel
        .find(filter)
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take)
        .lean()
        .exec();

      const itemCount = await this.uniteMesureModel.countDocuments(filter);

      return this.responseI18nService.fetchWithPagination(
        results,
        itemCount,
        pageOptionsDto,
        'UNITE_MESURE',
      );
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async dropDownForUniteMesure() {
    try {
      const uniteMesure = await this.uniteMesureModel
        .find()
        .sort({ designation: 1 })
        .lean();

      return this.responseI18nService.success(uniteMesure, 'UNITE_MESURE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const unite = await this.uniteMesureModel.findById(id).exec();
      if (!unite) {
        return this.responseI18nService.notFound();
      }
      return this.responseI18nService.success(unite, 'UNITE_MESURE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, UpdateUniteMesureDto: UpdateUniteMesureDto) {
    try {
      const updated = await this.uniteMesureModel
        .findByIdAndUpdate(id, UpdateUniteMesureDto, { new: true })
        .exec();
      if (!updated) {
        return this.responseI18nService.notFound();
      }
      return this.responseI18nService.update(updated, 'UNITE_MESURE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      // Check if the catalog is being used in related models
      await this.verificationService.isUniteUsed(id);

      const deleted = await this.uniteMesureModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        return this.responseI18nService.notFound();
      }
      return this.responseI18nService.delete(deleted, 'UNITE_MESURE');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }
}
