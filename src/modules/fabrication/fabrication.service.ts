import { Injectable, Logger } from '@nestjs/common';
import { CreateFabricationDto } from './dto/create-fabrication.dto';
import { UpdateFabricationDto } from './dto/update-fabrication.dto';
import { Model } from 'mongoose';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { Fabrication } from './entities/fabrication.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { FilterStockDto } from 'src/common/filter/filter.dto';
import { AppHelperService } from 'src/helpers/app.helper.service';
import { FabricationNestedDto } from 'src/common/fabrication.embedabble';
import { VerificationService } from '../verification.service';

@Injectable()
export class FabricationService {
  private readonly logger = new Logger(FabricationService.name);

  constructor(
    @InjectModel(Fabrication.name)
    private readonly fabModel: Model<Fabrication>,
    private readonly responseI18nService: ResponseI18nService,
    private readonly verificationService: VerificationService,
    private readonly appHelperService: AppHelperService,
  ) {}

  async create(dataDto: CreateFabricationDto) {
    try {
      if (dataDto.stock) {
        if (dataDto.stockMin <= 0) {
          throw this.responseI18nService.badRequest('STOCK.MINI');
        }
      }

      // Generate the reference
      const reference = this.appHelperService.generateReferenceNumber('FAB', 6);

      const updatedDto = {
        ...dataDto,
        reference,
      };

      const fabrication = await this.fabModel.create(updatedDto);

      return this.responseI18nService.create(fabrication, 'FABRICATION');
    } catch (error) {
      if (error) {
        this.logger.error('Error creating fabrications', error);
        throw this.responseI18nService.handleError(error);
      }
    }
  }

  async findAll(
    filterStockDto: FilterStockDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const { take, skip, order, search } = pageOptionsDto;

    // Validate pagination parameters
    if (skip < 0 || (take && take < 1)) {
      throw this.responseI18nService.badRequest('PAGINATION');
    }

    // Construct the filter object dynamically
    const filter: Record<string, any> = {};

    // Add search criteria
    if (search) {
      filter.designation = { $regex: search, $options: 'i' };
    }

    // Add stock management filter
    if (filterStockDto.enable === true) {
      filter.stock = true;
    } else if (filterStockDto.enable === false) {
      filter.stock = false;
    } else {
      filter.stock = { $ne: null };
    }

    if (search) {
      filter.designation = { $regex: search, $options: 'i' };
    }

    try {
      const query = this.fabModel
        .find(filter)
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take ?? 10)
        .exec();

      const results = await query;
      const itemCount = await this.fabModel.countDocuments();

      return this.responseI18nService.fetchWithPagination(
        results,
        itemCount,
        pageOptionsDto,
        'FABRICATION',
      );
    } catch (error) {
      this.logger.error('Error fetching fabrications:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const query = await this.fabModel.findOne({ _id: id }).lean();
      if (!query) {
        return this.responseI18nService.notFoundData('FABRICATION');
      }
      return this.responseI18nService.success(query, 'FABRICATION');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, updateFabricationDto: UpdateFabricationDto) {
    try {
      const updateResult = await this.fabModel.updateOne(
        { _id: id },
        updateFabricationDto,
      );
      if (updateResult.modifiedCount === 0) {
        return this.responseI18nService.notFoundData('FABRICATION');
      }
      return this.responseI18nService.success(updateResult, 'FABRICATION');
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      // Check if the fabrication is being used in related models
      await this.verificationService.isFabricationUsed(id);

      const deleted = await this.fabModel.findByIdAndDelete(id);
      if (deleted) {
        return this.responseI18nService.success(deleted, 'FABRICATION');
      } else {
        return this.responseI18nService.notFoundData('FABRICATION');
      }
    } catch (error) {
      throw this.responseI18nService.handleError(error);
    }
  }

  async findFabricationByStatus(filterStockDto: FilterStockDto): Promise<any> {
    try {
      const query = this.fabModel.find({ stock: filterStockDto.enable });
      const results = await query.lean().exec();

      return this.responseI18nService.success(results, 'FABRICATION');
    } catch (error) {
      this.logger.error('Error fetching fabrications:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async validateMultipleFabrications(
    fabrications: FabricationNestedDto[],
  ): Promise<FabricationNestedDto[]> {
    if (!Array.isArray(fabrications)) {
      throw this.responseI18nService.badRequest('FABRICATION.badRequest');
    }

    if (fabrications.length === 0) {
      return [];
    }

    for (const fab of fabrications) {
      const exists = await this.findOne(fab.fabricationId);
      if (!exists || !exists.data?._id) {
        throw this.responseI18nService.notFoundData('FABRICATION');
      }
    }

    const results = await Promise.all(
      fabrications.map(async (fab) => await this.validateFabrication(fab)),
    );
    const fabId = results
      .map((item) => item.fabrication?._id)
      .filter((id) => id !== undefined);

    const fabMixed = fabrications.map((item, index) => ({
      fabricationId: fabId[index].toString(),
      quantite: item.quantite,
      part: item.part,
      stockProduitArticle: item.stockProduitArticle,
    })) as FabricationNestedDto[];

    return fabMixed;
  }

  private async validateFabrication(fabrication: FabricationNestedDto) {
    if (!fabrication.fabricationId) {
      throw this.responseI18nService.badRequest('FABRICATION.invalidId');
    }
    const foundFabrication = await this.findOne(fabrication.fabricationId);

    return {
      fabrication: foundFabrication.data,
      quantite: fabrication.quantite,
      part: fabrication.part,
      stock: fabrication.stockProduitArticle,
    };
  }
}
