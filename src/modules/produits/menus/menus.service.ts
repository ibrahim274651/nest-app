import { Injectable, Logger } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { CategorieType } from 'src/utils/enumerations.enum';
import { Catalogue } from '../catalogue/entities/catalogue.entity';
import { CatalogueService } from '../catalogue/catalogue.service';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { TarrificationService } from 'src/settings/bases/tarrification/tarrification.service';
import { Tarrification } from 'src/settings/bases/tarrification/entities/tarrification.entity';
import { Tva } from 'src/settings/bases/tva/entities/tva.entity';
import { FilterFundDto } from 'src/common/filter/filter.dto';
import { AppHelperService } from 'src/helpers/app.helper.service';

@Injectable()
export class MenusService {
  private readonly logger = new Logger(MenusService.name);

  constructor(
    @InjectModel(Menu.name)
    private readonly menuModel: Model<Menu>,
    private readonly categoriesService: CategoriesService,
    private readonly catalogueService: CatalogueService,
    private readonly appHelperService: AppHelperService,
    private readonly responseI18nService: ResponseI18nService,
    private readonly tarificationService: TarrificationService,
  ) {}

  private async beforeCreateOrUpdate(
    dataDto: CreateMenuDto | UpdateMenuDto,
    isUpdate = false,
  ) {
    try {
      const [reference, category, catalogue, validateFabrications] =
        await Promise.all([
          isUpdate
            ? null
            : this.appHelperService.generateReferenceNumber('ART', 6),
          this.categoriesService.findOne(dataDto.categorie),
          this.catalogueService.findOne(dataDto.catalogue.id),
          this.tarificationService.validateMultipleTvasAndTarifications(
            dataDto.tarification,
          ),
        ]);

      const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
        catalogue: dataDto.catalogue,
      }).catalogue;

      if (!catalogue?.data?._id) {
        throw this.responseI18nService.notFoundData('CATALOGUE');
      }

      if (!category?.data?._id) {
        throw this.responseI18nService.notFoundData('CATEGORY');
      }

      if (category.data.typeFamille !== CategorieType.MENU) {
        throw this.responseI18nService.otherMessage('MENU.unmatch');
      }

      return {
        ...dataDto,
        designation: dataDto.designation,
        reference: isUpdate ? dataDto.reference : reference,
        categorie: category.data._id,
        catalogue: catalog,
        fabrication: validateFabrications,
      };
    } catch (error) {
      this.logger.error('Error in validation before create/update', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async create(dataDto: CreateMenuDto) {
    try {
      if (dataDto.articleGeneric === false) {
        if (dataDto.tarification) {
          const invalidTarification = dataDto.tarification.some(
            (item) => item.prixHT > item.prixTTC,
          );

          if (invalidTarification) {
            return this.responseI18nService.badRequest(
              'MENU.tarification.generic',
            );
          }
        }
      }

      const validatedData = await this.beforeCreateOrUpdate(dataDto);
      const created = await this.menuModel.create(validatedData);
      const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(
        created.toObject(),
      );

      return this.responseI18nService.create(formatData, 'MENU');
    } catch (error) {
      this.logger.error('Error creating menu', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findAll(filterFundDto: FilterFundDto, pageOptionsDto: PageOptionsDto) {
    try {
      const { take, skip, order, search } = pageOptionsDto;

      // Validate pagination parameters
      if (skip < 0 || (take && take < 1)) {
        throw this.responseI18nService.badRequest('PAGINATION');
      }

      // Construct the filter object dynamically
      const filter = this.constructFilter(filterFundDto);

      // Build the query with filtering, population, and sorting
      const query = this.buildQuery(filter, order, skip, take);
      const results = await query.lean().exec();

      // Filter results based on search criteria
      const filteredResults = this.filterResults(results, search);
      const paginatedResults = filteredResults.slice(skip, skip + take);

      // Return the paginated response
      return this.responseI18nService.fetchWithPagination(
        paginatedResults,
        filteredResults.length,
        pageOptionsDto,
        'MENU',
      );
    } catch (error) {
      console.error('Error fetching addons:', error.message, error.stack);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const query = await this.menuModel
        .findOne({ _id: id })
        .populate([{ path: 'categorie', model: Category.name }])
        .lean();
      if (!query) {
        return this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
      }
      return this.responseI18nService.success(query, 'ACCOMPAGNEMENT');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    try {
      const existingData = await this.menuModel.findById(id);
      if (!existingData) {
        throw this.responseI18nService.notFoundData('MENU');
      }

      // validate before update
      const validatedData = await this.beforeCreateOrUpdate(
        updateMenuDto,
        true,
      );

      const updated = await this.menuModel.findByIdAndUpdate(
        { _id: id },
        validatedData,
        { new: true },
      );

      // format data before returning them
      const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(
        updated.toObject(),
      );

      return this.responseI18nService.success(formatData, 'MENU');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.menuModel.findByIdAndDelete(id);
      if (deleted) {
        return this.responseI18nService.success(deleted, 'MENU');
      } else {
        return this.responseI18nService.notFoundData('MENU');
      }
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  // Build the query for fetching data
  private buildQuery(
    filter: Record<string, any>,
    order: string,
    skip: number,
    take: number,
  ) {
    return this.menuModel
      .find(filter)
      .populate([
        { path: 'categorie', model: Category.name, select: '_id designation' },
        { path: 'catalogue', model: Catalogue.name, select: '_id designation' },
        {
          path: 'tarification.tarificationId',
          model: Tarrification.name,
          select: '_id designation',
        },
        {
          path: 'tarification.tvaId',
          model: Tva.name,
          select: '_id designation',
        },
      ])
      .sort({ createdAt: order === 'DESC' ? -1 : 1 })
      .skip(skip)
      .limit(take);
  }

  // Construct the filter object based on FilterFundDto
  private constructFilter(filterFundDto: FilterFundDto): Record<string, any> {
    if (filterFundDto.enable === true) {
      return { visibleCaisse: true };
    } else if (filterFundDto.enable === false) {
      return { visibleCaisse: false };
    }

    return { visibleCaisse: { $ne: null } };
  }

  // Filter results based on search criteria
  private filterResults(results: any[], search: string): any[] {
    const formattedData = this.appHelperService.singleImageUrl(results);

    return formattedData.filter((item) => {
      if (
        !item.categorie ||
        !item.catalogue ||
        !item.reference ||
        !item.designation
      )
        return false;

      const { categorie, catalogue, reference, designation } = item;

      return (
        categorie.designation.match(new RegExp(search, 'i')) ||
        catalogue.designation.match(new RegExp(search, 'i')) ||
        reference.match(new RegExp(search, 'i')) ||
        designation.match(new RegExp(search, 'i'))
      );
    });
  }
}
