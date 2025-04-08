import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tva } from './entities/tva.entity';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
// import { VerificationService } from 'src/verification.service';

@Injectable()
export class TvaService {
  private readonly logger = new Logger(TvaService.name);
  constructor(
    @InjectModel(Tva.name) private tvaModel: Model<Tva>,
    // private readonly verificationService: VerificationService,
    private readonly responseI18nService: ResponseI18nService,
  ) {}

  async create(createTvaDto: CreateTvaDto) {
    try {
      const createdTva = await this.tvaModel.create(createTvaDto);
      return this.responseI18nService.create(createdTva, 'TVA');
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

      const results = await this.tvaModel
        .find(filter)
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take ?? 10)
        .lean()
        .exec();

      const itemCount = await this.tvaModel.countDocuments(filter);

      return this.responseI18nService.fetchWithPagination(
        results,
        itemCount,
        pageOptionsDto,
        'TVA',
      );
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // Tva without pagination
  async findTva() {
    try {
      const results = await this.tvaModel.find().exec();
      return this.responseI18nService.success(results, 'TVA');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const tva = await this.tvaModel.findById(id).lean().exec();
      if (!tva) {
        return this.responseI18nService.notFound();
      }
      return this.responseI18nService.success(tva, 'TVA');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, updateTvaDto: UpdateTvaDto) {
    try {
      const updatedTva = await this.tvaModel
        .findByIdAndUpdate(id, updateTvaDto, { new: true })
        .exec();
      if (!updatedTva) {
        return this.responseI18nService.notFound();
      }
      return this.responseI18nService.update(updatedTva, 'TVA');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      // Check if the tva is being used in related models
      // await this.verificationService.isTvaUsed(id);

      const deletedTva = await this.tvaModel.findByIdAndDelete(id).exec();
      if (!deletedTva) {
        return this.responseI18nService.notFound();
      }
      return this.responseI18nService.delete(deletedTva, 'TVA');
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }
}
