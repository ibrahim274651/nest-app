import { Injectable, Logger } from '@nestjs/common';
import { CreateCuissonDto } from './dto/create-cuisson.dto';
import { UpdateCuissonDto } from './dto/update-cuisson.dto';
import { Cuisson } from './entities/cuisson.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { CatalogueService } from '../catalogue/catalogue.service';
import { AppHelperService } from 'src/helpers/app.helper.service';
import { Catalogue } from '../catalogue/entities/catalogue.entity';

@Injectable()
export class CuissonsService {
  private readonly logger = new Logger(CuissonsService.name);
  constructor(
    @InjectModel(Cuisson.name)
    private readonly cuissonModel: Model<Cuisson>,
    private readonly catalogueService: CatalogueService,
    private readonly appHelperService: AppHelperService,
    private readonly responseI18nService: ResponseI18nService,
  ) {}

  private async beforeCreateOrUpdate(dto: CreateCuissonDto | UpdateCuissonDto) {
    if (!dto) {
      throw this.responseI18nService.badRequest('CUISSON');
    }

    const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
      catalogue: dto.catalogue,
    }).catalogue;

    // Construct final DTO
    const updatedDto = {
      ...dto,
      catalogue: catalog,
    };

    this.logger.debug('Constructed final DTO:', updatedDto);

    return updatedDto;
  }

  async create(dto: CreateCuissonDto) {
    try {
      const formatData = await this.beforeCreateOrUpdate(dto);
      const created = await this.cuissonModel.create(formatData);
      return this.responseI18nService.create(
        this.appHelperService.mapCatalogResponseWithImageUrl(
          created.toObject(),
        ),
        'CUISSON',
      );
    } catch (error) {
      this.logger.error('Error creating cuisson:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { take, skip, order, search } = pageOptionsDto;

    try {
      const filter: any = {};
      if (search) {
        filter.designation = { $regex: search, $options: 'i' };
      }

      const results = await this.cuissonModel
        .find(filter)
        .populate([
          {
            path: 'catalogue.id',
            model: Catalogue.name,
            select: '_id designation',
          },
        ])
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take)
        .lean()
        .exec();

      const itemCount = await this.cuissonModel.countDocuments(filter);

      const formattedData = await Promise.all(
        results.map((results) => this.formatCuissonData(results)),
      );

      return this.responseI18nService.fetchWithPagination(
        formattedData,
        itemCount,
        pageOptionsDto,
        'CUISSON',
      );
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // cuisson without pagination
  async getDropdown() {
    try {
      const data = await this.cuissonModel
        .find()
        .populate([
          {
            path: 'catalogue.id',
            model: Catalogue.name,
            select: '_id designation',
          },
        ])
        .lean()
        .exec();
      const formatData = this.appHelperService.singleImageUrl(data);
      return this.responseI18nService.success(formatData, 'CUISSON');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.cuissonModel
        .findById(id)
        .populate([
          {
            path: 'catalogue.id',
            model: Catalogue.name,
            select: '_id designation',
          },
        ])
        .lean()
        .exec();

      if (!data) {
        return this.responseI18nService.notFound();
      }

      const formatData = this.appHelperService.singleImageUrl([data])[0];

      return this.responseI18nService.success(formatData, 'CUISSON');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, updateDto: UpdateCuissonDto) {
    try {
      // Validate if category exists
      const existingData = await this.cuissonModel.findById(id);
      if (!existingData) {
        return this.responseI18nService.notFoundData('CUISSON');
      }

      // Transform catalogue if provided

      if (updateDto.catalogue) {
        const catalog = await this.beforeCreateOrUpdate(updateDto);
        updateDto.catalogue = catalog.catalogue;
      }

      const updated = await this.cuissonModel
        .findByIdAndUpdate(id, updateDto, { new: true })
        .exec();

      // format data before returning them
      const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(
        updated.toObject(),
      );
      return this.responseI18nService.update(formatData, 'CUISSON');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.cuissonModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        return this.responseI18nService.notFound();
      }
      return this.responseI18nService.delete(deleted, 'CUISSON');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  private async formatCuissonData(result: any): Promise<any> {
    if (!result) return null;
    return this.appHelperService.singleImageUrl([result])[0];
  }
}
