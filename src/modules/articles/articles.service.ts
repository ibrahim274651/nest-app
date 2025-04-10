import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './entities/article.entity';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { CategorieType } from 'src/utils/enumerations.enum';
import { FabricationService } from '../fabrication/fabrication.service';
import { Catalogue } from '../catalogue/entities/catalogue.entity';
import { CatalogueService } from '../catalogue/catalogue.service';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import {
  FilterStockDto,
  FilterCategoryDto,
  FilterStoreDto,
} from 'src/common/filter/filter.dto';
import { AppHelperService } from 'src/helpers/app.helper.service';
import { ApiResponse } from 'src/helpers/translate/types/i18n.types';
import { UniteMesure } from '../unite-mesure/entities/unite-mesure.entity';
import { Fabrication } from '../fabrication/entities/fabrication.entity';
import { TarificationService } from '../tarification/tarification.service';
import { TvaService } from '../tva/tva.service';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectModel(Article.name) private readonly itemModel: Model<Article>,
    private readonly categoriesService: CategoriesService,
    private readonly catalogueService: CatalogueService,
    private readonly fabricationService: FabricationService,
    private readonly responseI18nService: ResponseI18nService,
    private readonly tarificationService: TarificationService,
    private readonly tvaService: TvaService,
    // private readonly verificationService: VerificationService,
    private readonly appHelperService: AppHelperService,
  ) {}

  private async beforeCreateOrUpdate(
    dataDto: CreateArticleDto | UpdateArticleDto,
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
        validAccompagnement,
      ] = await Promise.all([
        isUpdate
          ? null
          : this.appHelperService.generateReferenceNumber('ART', 6),
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
        this.categoriesService.validateAccompagnement(dataDto.accompagnement),
      ]);

      const catalog = this.appHelperService.sanitizeCatalogDataBeforeSave({
        catalogue: dataDto.catalogue,
      }).catalogue;

      console.log('CatalogID: ', catalog);

      if (!catalogue?.data?._id) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }

      if (!category?.data?._id) {
        return this.responseI18nService.notFoundData('CATEGORY');
      }

      if (category.data.typeFamille !== CategorieType.ARTICLE) {
        return this.responseI18nService.badRequest('ARTICLE.unmatch');
      }

      if (dataDto.gererStockProduit && (dataDto.seuilMinimum ?? 0) <= 0) {
        return this.responseI18nService.badRequest('STOCK.MINI');
      }

      return {
        ...dataDto,
        designation: dataDto.designation,
        reference: isUpdate ? dataDto.reference : reference,
        categorie: category.data._id,
        catalogue: catalog,
        fabrication: validateFabrications,
        tarification: validateTarifications,
        accompagnement: validAccompagnement,
      };
    } catch (error) {
      this.logger.error('Error in validation before create/update', error);
      // throw error;
      return this.responseI18nService.handleError(error);
    }
  }

  async create(dataDto: CreateArticleDto) {
    try {
      const validatedData = await this.beforeCreateOrUpdate(dataDto);
      const created = await this.itemModel.create(validatedData);
      const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(
        created.toObject(),
      );
      return this.responseI18nService.create(formatData, 'ARTICLE');
    } catch (error) {
      console.error('Error creating article:', error);
      throw this.responseI18nService.handleError(error);
      // throw error;
    }
  }

  async findAll(
    filterStockDto: FilterStockDto,
    category: FilterCategoryDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    try {
      const { take, skip, order, search } = pageOptionsDto;

      if (skip < 0 || (take && take < 1)) {
        throw this.responseI18nService.badRequest('PAGINATION');
      }

      const filter: Record<string, any> = {};

      if (search) {
        filter.$or = [
          { designation: { $regex: search, $options: 'i' } },
          { reference: { $regex: search, $options: 'i' } },
        ];
      }

      if (category.categoryId) {
        filter.categorie = category.categoryId;
      }

      if (filterStockDto.enable === true) {
        filter.gererStockProduit = true;
      } else if (filterStockDto.enable === false) {
        filter.gererStockProduit = false;
      } else {
        filter.gererStockProduit = { $ne: null };
      }

      const query = this.itemModel
        .find(filter)
        .populate([
          {
            path: 'categorie',
            model: Category.name,
            select: '_id designation',
          },
          {
            path: 'accompagnement',
            model: Category.name,
            select: '_id designation stock typeFamille',
          },
          {
            path: 'uniteDetails.unite',
            model: UniteMesure.name,
            select: '_id designation symbole',
          },
          {
            path: 'fabrication.fabricationId',
            model: Fabrication.name,
            // select: '_id designation',
          },
        ])
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take ?? 10);

      const [results, itemCount] = await Promise.all([
        query.lean().exec(),
        this.itemModel.countDocuments(filter),
      ]);

      // const formattedData = await Promise.all(
      //   results.map((article) => this.formatItemsData(article)),
      // );

      const formattedData = await Promise.all(
        results.map(async (article) => {
          const formattedArticle = await this.formatItemsData(article);
          return {
            ...formattedArticle,
            fabrication: formattedArticle.fabrication?.map((fab) => ({
              fabricationId: fab.fabricationId
                ? {
                    _id: fab.fabricationId._id || null,
                    designation: fab.fabricationId.designation || null,
                    quantite: fab.quantite || null,
                    part: fab.part || null,
                    stockProduitArticle: fab.stockProduitArticle || null,
                  }
                : null,
            })),
            unite: formattedArticle.uniteDetails
              ? {
                  _id: formattedArticle.uniteDetails.unite?._id || null,
                  designation:
                    formattedArticle.uniteDetails.unite?.designation || null,
                  symbole: formattedArticle.uniteDetails.unite?.symbole || null,
                  cond: formattedArticle.uniteDetails.cond || null,
                }
              : null,
            uniteDetails: undefined,
          };
        }),
      );

      return this.responseI18nService.fetchWithPagination(
        formattedData,
        itemCount,
        pageOptionsDto,
        'ARTICLE',
      );
    } catch (error) {
      this.logger.error('Error fetching articles:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findItemByCategory(
    categoryId: string,
    stock?: FilterStockDto,
  ): Promise<ApiResponse<Article>> {
    try {
      const filter: any = { categorie: categoryId };
      if (stock?.enable !== undefined) {
        filter.gererStockProduit = stock.enable;
      }

      const results = await this.itemModel
        .find(filter)
        .populate([
          { path: 'catalogue', model: Catalogue.name },
          { path: 'categorie', model: Category.name },
        ])
        .lean()
        .exec();

      return this.responseI18nService.fetchAll(results, 'ARTICLE');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async dropDownCategoryItems(stock?: FilterStockDto): Promise<any> {
    try {
      // Fetch all categories
      const response = await this.categoriesService.categoryDropDown(stock);

      if (!response || !response.data?.length) {
        throw this.responseI18nService.notFoundData('CATEGORY');
      }

      const categories = response.data;

      // Fetch articles for each category concurrently
      const data = await Promise.all(
        categories.map(async (category) => {
          const articles = await this.findItemByCategory(category._id, stock);
          return {
            _id: category._id,
            designation: category.designation,
            typeFamille: category.typeFamille,
            stock: category.stock,
            articles: articles.data.map((item) => ({
              _id: item._id,
              designation: item.designation,
              catalogue: item.catalogue,
            })),
          };
        }),
      );

      // console.log('Formatted Data:', JSON.stringify(data, null, 4));

      return this.responseI18nService.fetchAll(data, 'ARTICLE');
    } catch (error) {
      this.logger.error('Error retrieving dropdown data:', error);
      // throw this.responseI18nService.handleError(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.itemModel.findOne({ _id: id }).lean();
      const data = await this.formatItemsData(item);

      return this.responseI18nService.success(data, 'ARTICLE');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOneStockTrue(data: { _id: string; stock: boolean }) {
    try {
      const { _id, stock } = data;
      const query = await this.itemModel
        .findOne({
          _id: _id,
          gererStockProduit: stock,
        })
        .lean();
      return this.responseI18nService.success(query, 'ARTICLE');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, dataDto: UpdateArticleDto) {
    try {
      const existingData = await this.itemModel.findById(id);
      if (!existingData) {
        throw this.responseI18nService.notFoundData('ARTICLE');
      }

      // validate before update
      const validatedData = await this.beforeCreateOrUpdate(dataDto, true);

      const updated = await this.itemModel.findByIdAndUpdate(
        id,
        validatedData,
        {
          new: true,
        },
      );

      if (!updated) {
        return this.responseI18nService.notFound();
      }

      // format data before returning them
      const formatData = this.appHelperService.mapCatalogResponseWithImageUrl(
        updated.toObject(),
      );
      return this.responseI18nService.update(formatData, 'ARTICLE');
    } catch (error) {
      console.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      // Check if the item is being used in related models
      // await this.verificationService.isItemUsed(id);

      const article = await this.itemModel.findById(id);
      if (!article) {
        throw this.responseI18nService.notFoundData('ARTICLE');
      }
      const deleted = await this.itemModel.findByIdAndDelete(id);
      if (deleted) {
        return this.responseI18nService.delete(deleted, 'ARTICLE');
      } else {
        throw this.responseI18nService.notFoundData('ARTICLE');
      }
    } catch (error) {
      console.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  private async formatItemsData(article: any): Promise<any> {
    if (!article) return null;

    const items = this.appHelperService.singleImageUrl([article])[0];

    if (items.tarification && items.tarification.length) {
      items.tarification = await Promise.all(
        items.tarification.map(async (tarif) => {
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
      items.tarification = [];
    }

    return items;
  }
}
