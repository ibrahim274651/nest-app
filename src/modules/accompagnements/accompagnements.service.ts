import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateAccompagnementDto } from './dto/create-accompagnement.dto';
import { UpdateAccompagnementDto } from './dto/update-accompagnement.dto';
import { Accompagnement } from './entities/accompagnement.entity';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { CategorieType } from 'src/utils/enumerations.enum';
import { FabricationService } from '../fabrication/fabrication.service';
import { CatalogueService } from '../catalogue/catalogue.service';
import { Catalogue } from '../catalogue/entities/catalogue.entity';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';

import { Fabrication } from '../fabrication/entities/fabrication.entity';
import { AppHelperService } from 'src/helpers/app.helper.service';
import { TarificationService } from '../tarification/tarification.service';
import { TvaService } from '../tva/tva.service';
import { FilterStockDto } from 'src/common/filter/filter.dto';
import { Tarrification } from '../tarification/entities/tarification.entity';
import { Tva } from '../tva/entities/tva.entity';

@Injectable()
export class Accompagnementervice {
  private readonly logger = new Logger(Accompagnementervice.name);
  constructor(
    @InjectModel(Accompagnement.name)
    private readonly addOnModel: Model<Accompagnement>,
    private readonly referenceService: AppHelperService,
    private readonly tarificationService: TarificationService,
    private readonly categoriesService: CategoriesService,
    private readonly catalogueService: CatalogueService,
    private readonly fabricationService: FabricationService,
    private readonly tvaService: TvaService,
    private readonly responseI18nService: ResponseI18nService,
    private readonly appHelperService: AppHelperService,
  ) {}

  async create(dataDto: CreateAccompagnementDto) {
    try {
      // validate before create
      const validatedData = await this.beforeCreateOrUpdate(dataDto);
      const addOn = await this.addOnModel.create(validatedData);
      return this.responseI18nService.create(addOn, 'ACCOMPAGNEMENT');
    } catch (error) {
      this.logger.error('Error creating add-ons', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findAll(
    filterStockDto: FilterStockDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    try {
      const { take, skip, order, search } = pageOptionsDto;

      // Validate pagination parameters
      if (skip < 0 || (take && take < 1)) {
        throw this.responseI18nService.badRequest('PAGINATION');
      }

      // Construct the filter object dynamically
      const filter: Record<string, any> = {};

      // Add search criteria
      if (search) {
        filter.$or = [{ designation: { $regex: search, $options: 'i' } }];
      }

      // Add stock management filter
      if (filterStockDto.enable === true) {
        filter.gererStockProduit = true;
      } else if (filterStockDto.enable === false) {
        filter.gererStockProduit = false;
      } else {
        filter.gererStockProduit = { $ne: null };
      }

      // Build the query with filtering, population, and sorting
      const query = this.addOnModel
        .find(filter)
        .populate([
          {
            path: 'categorie',
            model: Category.name,
            select: '_id designation',
          },
          { path: 'catalogue', model: Catalogue.name },
          { path: 'tarification.tarificationId', model: Tarrification.name },
          {
            path: 'tarification.tvaId',
            model: Tva.name,
            select: '_id designation',
          },
          {
            path: 'fabrication.fabricationId',
            model: Fabrication.name,
          },
        ])
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take ?? 10);

      const [results, itemCount] = await Promise.all([
        query.lean().exec(),
        this.addOnModel.countDocuments(filter),
      ]);

      const formattedData = await Promise.all(
        results.map((results) => this.formatAddonsData(results)),
      );

      // Return the paginated response
      return this.responseI18nService.fetchWithPagination(
        formattedData,
        itemCount,
        pageOptionsDto,
        'ACCOMPAGNEMENT',
      );
    } catch (error) {
      console.error('Error fetching addons:', error.message, error.stack);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const query = await this.addOnModel
        .findOne({ _id: id })
        .populate([{ path: 'categorie', model: Category.name }])
        .lean();
      if (!query) {
        return this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
      }
      const formatData = this.appHelperService.singleImageUrl([query])[0];
      return this.responseI18nService.success(formatData, 'ACCOMPAGNEMENT');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, dataDto: UpdateAccompagnementDto) {
    try {
      const existingData = await this.addOnModel.findById(id);
      if (!existingData) {
        throw this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
      }

      // validate before update
      const validatedData = await this.beforeCreateOrUpdate(dataDto, true);

      const updated = await this.addOnModel.findByIdAndUpdate(
        id,
        validatedData,
        { new: true },
      );

      if (!updated) {
        return this.responseI18nService.notFound();
      }
      // format data before returning them
      const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(
        updated.toObject(),
      );
      return this.responseI18nService.update(formatData, 'ACCOMPAGNEMENT');
    } catch (error) {
      this.logger.error('Error updating add-ons', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.addOnModel.findByIdAndDelete(id);
      if (deleted) {
        return this.responseI18nService.success(deleted, 'ACCOMPAGNEMENT');
      } else {
        return this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
      }
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  // Validate Accompagnement
  async validateAccompagnement(Accompagnement?: string[]): Promise<any[]> {
    if (!Array.isArray(Accompagnement) || Accompagnement.length === 0) {
      return [];
    }

    const AccompagnementIds = Accompagnement.map((id) => id.trim()).filter(
      (id) => mongoose.isValidObjectId(id),
    );

    if (AccompagnementIds.length === 0) {
      // return [];
      throw this.responseI18nService.notFoundData('ACCOMPAGNEMENT');
    }

    const existingAccompagnement = await this.addOnModel.find({
      _id: {
        $in: AccompagnementIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
    });

    if (existingAccompagnement.length !== AccompagnementIds.length) {
      const existingIds = existingAccompagnement.map((item) =>
        (item._id as mongoose.Types.ObjectId).toString(),
      );
      const missingIds = AccompagnementIds.filter(
        (id) => !existingIds.includes(id),
      );

      this.logger.error(
        `Les Accompagnement suivants sont introuvables : ${missingIds.join(', ')}`,
      );

      throw this.responseI18nService.badRequest('ACCOMPAGNEMENT.notFound');
    }

    return existingAccompagnement;
  }

  private async beforeCreateOrUpdate(
    dataDto: CreateAccompagnementDto | UpdateAccompagnementDto,
    isUpdate = false,
  ) {
    const fabrication = Array.isArray(dataDto.fabrication)
      ? dataDto.fabrication
      : [];

    try {
      const [
        reference,
        category,
        catalogue,
        validateFabrications,
        validateTarifications,
      ] = await Promise.all([
        isUpdate
          ? null
          : this.referenceService.generateReferenceNumber('ACC', 6),
        dataDto.categorie
          ? this.categoriesService.findOne(dataDto.categorie)
          : Promise.reject(new Error('Category ID is undefined')),
        dataDto.catalogue?.id
          ? this.catalogueService.findOne(dataDto.catalogue.id)
          : Promise.reject(new Error('Catalogue ID is undefined')),
        this.fabricationService.validateMultipleFabrications(fabrication),
        this.tarificationService.validateMultipleTvasAndTarifications(
          dataDto.tarification ?? [],
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

      if (category.data.typeFamille !== CategorieType.ACCOMPAGNEMENT) {
        throw this.responseI18nService.badRequest('ACCOMPAGNEMENT.unmatch');
      }

      if (dataDto.gererStockProduit && (dataDto.stockMini ?? 0) <= 0) {
        throw this.responseI18nService.badRequest('STOCK.MINI');
      }

      return {
        ...dataDto,
        reference: isUpdate ? dataDto.reference : reference,
        categorie: category.data._id,
        catalogue: catalog,
        fabrication: validateFabrications,
        tarification: validateTarifications,
      };
    } catch (error) {
      this.logger.error('Error in validation before create/update', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  private async formatAddonsData(article: any): Promise<any> {
    if (!article) return null;

    const addOns = this.appHelperService.singleImageUrl([article])[0];

    if (addOns.tarification && addOns.tarification.length) {
      addOns.tarification = await Promise.all(
        addOns.tarification.map(async (tarif) => {
          if (!tarif.tarificationId) {
            console.warn('tarificationId is missing', tarif);
            return null; // Skip if ID is missing
          }

          const [tarifData, tvaData] = await Promise.all([
            this.tarificationService.findOne(tarif.tarificationId),
            tarif.tvaId ? this.tvaService.findOne(tarif.tvaId) : null,
          ]);

          return {
            _id: tarifData?.data?._id ?? null,
            designation: tarifData?.data?.designation ?? null,
            consumptionMode: tarifData?.data?.modeConsommation ?? null,
            tva: tvaData?.data
              ? {
                  _id: tvaData?.data?._id ?? null,
                  designation: tvaData?.data?.designation ?? null,
                }
              : null,
            caisse: tarif?.caisse ?? null,
            prixTTC: tarif?.prixTTC ?? null,
            prixHT: tarif?.prixHT ?? null,
          };
        }),
      ).then((res) => res.filter(Boolean));
    } else {
      addOns.tarification = [];
    }

    return addOns;
  }
}
