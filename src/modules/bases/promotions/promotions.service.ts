import { Injectable, Logger } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { PipelineService } from 'src/helpers/pipeline/pipeline.service';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { LookupOptions } from 'src/helpers/pipeline/lookupOptions.interface';
import { Article } from 'src/settings/produits/articles/entities/article.entity';

@Injectable()
export class PromotionsService {
  private readonly logger = new Logger(PromotionsService.name);

  constructor(
    @InjectModel(Promotion.name)
    private readonly promotionModel: Model<Promotion>,
    private readonly pipelineService: PipelineService,
    private readonly responseI18nService: ResponseI18nService,
  ) {}

  async create(dataDto: CreatePromotionDto) {
    const articles = Array.isArray(dataDto.articles) ? dataDto.articles : [];
    try {
      let promotion;
      if (dataDto.periodeIllimite) {
        promotion = await this.promotionModel.create({
          designation: dataDto.designation,
          quantite: dataDto.quantite,
          articles: articles,
          periodeIllimite: true,
        });
      } else {
        promotion = await this.promotionModel.create({ ...dataDto, articles });
      }

      return this.responseI18nService.create(promotion, 'PROMOTION');
    } catch (error) {
      this.logger.error(error);
      throw this.handleCreateError(error);
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
      const results = await this.promotionModel
        .find(filter)
        .populate([
          {
            path: 'articles.articleId',
            model: Article.name,
            select: 'reference designation tarification',
          },
        ])
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take)
        .lean()
        .exec();

      const filteredResults = this.filterResults(results, search);
      const paginatedResults = filteredResults.slice(skip, skip + take);

      // const itemCount = await this.promotionModel.countDocuments(filter);

      return this.responseI18nService.fetchWithPagination(
        paginatedResults,
        filteredResults.length,
        pageOptionsDto,
        'PROMOTION',
      );
    } catch (error) {
      this.logger.error('Error fetching promotion:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findItemsWhichHasPromotion(pageOptionsDto: PageOptionsDto) {
    const { take, skip, order, search } = pageOptionsDto;

    try {
      // Prepare the match stage based on search criteria
      const matchStage: any = {};
      if (search) {
        matchStage.designation = { $regex: search, $options: 'i' };
      }

      // Build the aggregation pipeline using the PipelineService
      const articleLookupOptions: LookupOptions = {
        localField: 'articles.articleId',
        foreignField: '_id',
        as: 'articleDetails',
      };

      const tarificationLookupOptions: LookupOptions = {
        localField: 'tarification.tarificationId',
        foreignField: '_id',
        as: 'tarificationDetails',
      };

      const tvaLookupOptions: LookupOptions = {
        localField: 'tarificationDetails.tvaId',
        foreignField: '_id',
        as: 'tvaDetails',
      };

      // const groupStage = {
      //   $group: {
      //     _id: {
      //       promotionId: '$_id',
      //       articleId: '$articles.articleId',
      //     },
      //     designation: { $first: '$designation' },
      //     articles: { $push: '$articles' },
      //   },
      // };

      const projectStage = {
        $project: {
          _id: 1,
          designation: 1,
          articles: {
            articleId: '$articleDetails',
            achat: '$articles.achat',
            offert: '$articles.offert',
          },
        },
      };

      // Sort stage
      const sortStage: PipelineStage = {
        $sort: { createdAt: order === 'DESC' ? -1 : 1 },
      };

      // Pagination stages
      const paginationStages: PipelineStage[] = [
        { $skip: skip },
        { $limit: take },
      ];

      // Construct the pipeline
      const pipeline: PipelineStage[] = [
        { $match: matchStage },
        ...this.pipelineService.articles(articleLookupOptions),
        { $unwind: '$articles' },
        ...this.pipelineService.tarifications(tarificationLookupOptions),
        ...this.pipelineService.tvas(tvaLookupOptions),
        { $unwind: '$articleDetails' },
        sortStage,
        ...paginationStages,
        projectStage,
      ];

      // Execute the aggregation pipeline
      const results = await this.promotionModel.aggregate(pipeline).exec();

      // Get total count for pagination
      const itemCount = await this.promotionModel.countDocuments(matchStage);

      return this.responseI18nService.fetchWithPagination(
        results,
        itemCount,
        pageOptionsDto,
        'PROMOTION',
      );
    } catch (error) {
      this.logger.error('Error fetching promotion:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const query = await this.promotionModel.findOne({ _id: id });
      if (!query) {
        return this.responseI18nService.notFoundData('PROMOTION');
      }
      return this.responseI18nService.success(query, 'PROMOTION');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    try {
      const updateResult = await this.promotionModel.findByIdAndUpdate(
        id,
        updatePromotionDto,
        { new: true },
      );
      return this.responseI18nService.update(updateResult, 'PROMOTION');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.promotionModel.findByIdAndDelete(id);
      if (deleted) {
        return this.responseI18nService.delete(deleted, 'PROMOTION');
      } else {
        return this.responseI18nService.notFoundData('PROMOTION');
      }
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  // Filter results based on search criteria
  private filterResults(results: Promotion[], search: string): any[] {
    const regex = new RegExp(search, 'i');

    return results.filter((item) => {
      if (!item.articles || !item.designation) return false;

      return (
        item.articles.some((article) => {
          const { articleId } = article;

          if (
            articleId &&
            typeof articleId._id === 'string' &&
            typeof articleId.designation === 'string'
          ) {
            return (
              articleId._id.match(regex) || articleId.designation.match(regex)
            );
          }
          return false;
        }) || item.designation.match(regex)
      );
    });
  }

  private handleCreateError(error: any): never {
    const errorMappings = {
      DATE_VALIDATION: 'PROMOTION.DATE_VALIDATION',
      BONUS_REQUIRED: 'PROMOTION.BONUS_REQUIRED',
      DATE_REQUIRED: 'PROMOTION.DATE_REQUIRED',
    };

    const conflictErrors = {
      PROMOTION_EXIST: 'PROMOTION.PROMOTION_EXIST',
    };

    if (conflictErrors[error.message]) {
      throw this.responseI18nService.badRequest(conflictErrors[error]);
    }

    if (errorMappings[error]) {
      throw this.responseI18nService.badRequest(errorMappings[error]);
    }

    this.logger.error(error);
    throw this.responseI18nService.handleError(error);
  }
}
