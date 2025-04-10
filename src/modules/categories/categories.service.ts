/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import mongoose, { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { Catalogue } from '../catalogue/entities/catalogue.entity';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';

import {
  FilterConsumptionModeDto,
  FilterStockDto,
  FilterTypeCategoryDto,
} from 'src/common/filter/filter.dto';
import { AppHelperService } from 'src/helpers/app.helper.service';
import { TarificationService } from '../tarification/tarification.service';
import { VerificationService } from '../verification.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectModel(Category.name)
    private readonly categoryDocument: Model<Category>,
    private readonly tarificationService: TarificationService,
    private readonly appHelperService: AppHelperService,
    private readonly verificationService: VerificationService,
    private readonly responseI18nService: ResponseI18nService,
  ) {}

  private async beforeCreateOrUpdate(
    dto: CreateCategoryDto | UpdateCategoryDto,
  ) {
    try {
      if (!dto) {
        throw this.responseI18nService.badRequest('CATEGORIE');
      }

      const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
        catalogue: dto.catalogue,
      }).catalogue;

      const validTarifications =
        Array.isArray(dto.tarification) && dto.tarification.length > 0
          ? await this.tarificationService.validateTarificationId(
              dto.tarification,
            )
          : (dto.tarification ?? []);

      const updatedDto = {
        ...dto,
        designation: dto.designation,
        catalogue: catalog,
        tarification: validTarifications,
      };

      this.logger.debug('Constructed final DTO:', updatedDto);

      return updatedDto;
    } catch (error) {
      this.logger.error('Error in beforeCreateOrUpdate:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async create(dto: CreateCategoryDto) {
    try {
      const categoryData = await this.beforeCreateOrUpdate(dto);
      const category = await this.categoryDocument.create(categoryData);
      return this.responseI18nService.create(
        this.appHelperService.mapCatalogResponseWithImageUrl(
          category.toObject(),
        ),
        'CATEGORY',
      );
    } catch (error) {
      this.logger.error('Error creating category:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { take, skip, order, search } = pageOptionsDto;

    try {
      if (skip < 0 || (take && take < 1)) {
        throw this.responseI18nService.badRequest('PAGINATION');
      }
      const filter: any = search
        ? { designation: { $regex: search, $options: 'i' } }
        : {};

      const itemCount = await this.categoryDocument.countDocuments(filter);

      const categories = await this.categoryDocument
        .find(filter)
        // .populate([
        //   {
        //     path: 'catalogue.id',
        //     model: Catalogue.name,
        //     select: '_id designation',
        //   },
        // ])
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take ?? 10)
        .lean()
        .exec();

      const formattedData = await Promise.all(
        categories.map((category) => this.formatCategoryData(category)),
      );

      console.log('formatData:', formattedData);

      return this.responseI18nService.fetchWithPagination(
        formattedData,
        itemCount,
        pageOptionsDto,
        'CATEGORY',
      );
    } catch (error) {
      this.logger.error(error);
      return this.responseI18nService.handleError(error);
    }
  }

  async getdropDownForCategory(
    type: FilterTypeCategoryDto,
    stock: FilterStockDto,
  ) {
    try {
      const filter: any = {};
      if (type?.typeFamille !== undefined) {
        filter.typeFamille = type.typeFamille;
      }

      if (stock?.enable !== undefined) {
        filter.stock = stock.enable;
      }
      const results = await this.categoryDocument
        .find(filter)
        .populate([
          {
            path: 'catalogue.id',
            model: Catalogue.name,
            select: '_id designation',
          },
        ])
        .lean()
        .select('designation typeFamille catalogue')
        .exec();

      // maps images
      const formatData = this.appHelperService.singleImageUrl(results);
      return this.responseI18nService.fetchAll(formatData, 'CATEGORY');
    } catch (error) {
      this.logger.error(error);
      return this.responseI18nService.handleError(error);
    }
  }

  async getCategoryByTarif(
    filter_mode: FilterConsumptionModeDto,
    stock: FilterStockDto,
  ) {
    try {
      // Build the query condition
      const filter: any = {};
      if (stock?.enable !== undefined) {
        filter.stock = stock.enable;
      }
      const results = await this.categoryDocument
        .find(filter)
        .populate([
          {
            path: 'catalogue.id',
            model: Catalogue.name,
            select: '_id designation',
          },
        ])
        .lean()
        .exec();
      console.log('Formatted Data:', JSON.stringify(results, null, 4));

      const formatData = await this.filterResults(results, filter_mode);

      console.log('formatData :', formatData);

      return this.responseI18nService.fetchAll(formatData, 'CATEGORY');
    } catch (error) {
      this.logger.error(error);
      console.error(error);
      return this.responseI18nService.handleError(error);
    }
  }

  async categoryDropDown(stock?: FilterStockDto) {
    try {
      // Build the query condition
      const filter: any = {};
      if (stock?.enable !== undefined) {
        filter.stock = stock.enable;
      }

      const results = await this.categoryDocument
        .find(filter)
        .populate([
          {
            path: 'catalogue.id',
            model: Catalogue.name,
            select: '_id designation',
          },
        ])
        .lean()
        .exec();

      // maps images
      const formatData = this.appHelperService.singleImageUrl(results);
      return this.responseI18nService.success(formatData, 'CATEGORY');
    } catch (error) {
      this.logger.error(error);
      return this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const categorie = await this.categoryDocument.findOne({ _id: id }).lean();
      if (!categorie) {
        throw this.responseI18nService.notFoundData('CATEGORY');
      }

      const formatData = await this.formatCategoryData(categorie);

      return this.responseI18nService.success(formatData, 'CATEGORY');
    } catch (error) {
      this.logger.error('Error fetching category:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      // Validate if category exists
      const existingCategory = await this.categoryDocument.findById(categoryId);
      if (!existingCategory) {
        return this.responseI18nService.notFoundData('CATEGORY');
      }

      // Transform catalogue if provided
      if (updateCategoryDto.catalogue) {
        const catalog = await this.beforeCreateOrUpdate(updateCategoryDto);
        updateCategoryDto.catalogue = catalog.catalogue;
      }

      // Update the category
      const updatedCategory = await this.categoryDocument.findByIdAndUpdate(
        categoryId,
        updateCategoryDto,
        { new: true },
      );

      if (!updatedCategory) {
        return this.responseI18nService.notFoundData('CATEGORY');
      }

      // format data before returning them
      const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(
        updatedCategory.toObject(),
      );

      return this.responseI18nService.update(formatData, 'CATEGORY');
    } catch (error) {
      this.logger.error('Error updating category:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.categoryDocument.findByIdAndDelete(id);

      // Check if the catalog is being used in related models
      await this.verificationService.isCategoryUsed(id);

      if (deleted) {
        return this.responseI18nService.delete(deleted, 'CATEGORY');
      } else {
        throw this.responseI18nService.notFoundData('CATEGORY');
      }
    } catch (error) {
      this.logger.error('Error deleting category:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  private async formatCategoryData(category: any): Promise<any> {
    if (!category) return null;

    const formattedCategory = this.appHelperService.singleImageUrl([
      category,
    ])[0];

    if (
      formattedCategory.tarification &&
      formattedCategory.tarification.length
    ) {
      const tarifications = await Promise.all(
        formattedCategory.tarification.map(async (tarifId) => {
          const tarif = await this.tarificationService.findOne(tarifId);
          return tarif?.data
            ? {
                _id: tarif.data._id,
                designation: tarif.data.designation,
                consumptionMode: tarif.data.modeConsommation,
              }
            : null;
        }),
      );

      // Filter out null values, ensuring an empty array is returned if all are null
      formattedCategory.tarification = tarifications.filter(Boolean);
    } else {
      formattedCategory.tarification = [];
    }

    return formattedCategory;
  }

  private async filterResults(
    results: any[],
    filter: FilterConsumptionModeDto,
  ): Promise<any[]> {
    if (!Array.isArray(results) || results.length === 0) return [];

    const formattedResults = await Promise.all(
      results.map((category) => this.formatCategoryData(category)),
    );

    console.log('Formatted Data:', JSON.stringify(formattedResults, null, 4));

    return formattedResults
      .map((item) => {
        const { tarification } = item;

        if (!filter.mode) {
          return item;
        }

        const dt = tarification?.find(
          (tarif) => tarif.consumptionMode === filter.mode,
        );

        return dt ? { ...item, tarification: dt } : null;
      })
      .filter((item) => item !== null);
  }

  // Validate Accompagnement
  async validateAccompagnement(ids?: string[]): Promise<any[]> {
    if (!Array.isArray(ids) || ids.length === 0) {
      return [];
    }

    console.log('ids:', ids);

    const categoryIds = ids
      .map((id) => id.trim())
      .filter((id) => mongoose.isValidObjectId(id));

    if (categoryIds.length === 0) {
      // return [];
      throw this.responseI18nService.notFoundData('CATEGORY');
    }

    const existingCategoryIds = (await this.categoryDocument.find({
      _id: {
        $in: ids.map((id) => new mongoose.Types.ObjectId(id)),
      },
    })) as Array<{ _id: mongoose.Types.ObjectId }>;

    if (existingCategoryIds.length !== existingCategoryIds.length) {
      const existingIds = existingCategoryIds.map((item) =>
        item._id.toString(),
      );
      const missingIds = existingIds.filter((id) => !existingIds.includes(id));

      this.logger.error(
        `Les categorie suivants de type Accompagnement sont introuvables : ${missingIds.join(', ')}`,
      );

      throw this.responseI18nService.badRequest('ACCOMPAGNEMENT.notFound');
    }

    console.log('existingCategoryIds:', existingCategoryIds);

    return existingCategoryIds.map((item) => item._id);
  }
}
