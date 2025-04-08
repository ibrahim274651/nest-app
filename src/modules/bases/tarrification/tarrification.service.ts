import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTarrificationDto } from './dto/create-tarrification.dto';
import { Tarrification } from './entities/tarrification.entity';
import { UpdateTarrificationDto } from './dto/update-tarrification.dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { TvaService } from '../tva/tva.service';
import { NestedTarificationDto } from 'src/common/tarification.embedabble';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { FilterConsumptionModeDto } from 'src/common/filter/filter.dto';
// import { VerificationService } from 'src/verification.service';

@Injectable()
export class TarrificationService {
  private readonly logger = new Logger(TarrificationService.name);

  constructor(
    @InjectModel(Tarrification.name)
    private tarificationModel: Model<Tarrification>,
    private readonly tvaService: TvaService,
    // private readonly verificationService: VerificationService,
    private readonly responseI18nService: ResponseI18nService,
  ) {}

  async create(createTarrificationDto: CreateTarrificationDto) {
    try {
      if (createTarrificationDto.defaultTva) {
        const tvaExists = await this.tvaService.findOne(
          createTarrificationDto.defaultTva,
        );
        if (!tvaExists) {
          return this.responseI18nService.notFoundData('TVA');
        }
      }

      const data = await this.tarificationModel.create(createTarrificationDto);
      return this.responseI18nService.create(data, 'TARIFICATION');
    } catch (error) {
      this.logger.error('Error creating Tarrification:', error.message);
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

      const results = await this.tarificationModel
        .find(filter)
        .sort({ createdAt: order === 'DESC' ? -1 : 1 })
        .skip(skip)
        .limit(take ?? 10)
        .lean()
        .exec();

      const itemCount = await this.tarificationModel.countDocuments(filter);

      return this.responseI18nService.fetchWithPagination(
        results,
        itemCount,
        pageOptionsDto,
        'TARIFICATION',
      );
    } catch (error) {
      this.logger.error(error);
      throw this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const tarification = await this.tarificationModel.findById(id).exec();

      // if (!tarification) {
      //   return this.responseI18nService.notFoundData('TARIFICATION');
      // }

      return this.responseI18nService.success(tarification, 'TARIFICATION');
    } catch (error) {
      console.error('Error retrieving Tarrification:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  async findByConsomation(tarif: FilterConsumptionModeDto) {
    try {
      const filter: any = {};

      if (tarif?.mode) {
        filter.modeConsommation = tarif.mode;
      }

      const tarification = await this.tarificationModel.find(filter).exec();

      return this.responseI18nService.fetchAll(tarification, 'TARIFICATION');
    } catch (error) {
      console.error('Error retrieving Tarrification:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  async update(id: string, updateTarrificationDto: UpdateTarrificationDto) {
    try {
      const updatedTarification = await this.tarificationModel
        .findByIdAndUpdate(id, updateTarrificationDto, { new: true })
        .exec();

      if (!updatedTarification) {
        return this.responseI18nService.notFoundData('TARIFICATION');
      }

      return this.responseI18nService.update(
        updatedTarification,
        'TARIFICATION',
      );
    } catch (error) {
      this.logger.error('Error updating Tarrification:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      // Check if the tarif is being used in related models
      // await this.verificationService.isTarificationUsed(id);

      const deletedTarification = await this.tarificationModel
        .findByIdAndDelete(id)
        .exec();

      if (!deletedTarification) {
        return this.responseI18nService.notFoundData('TARIFICATION');
      }

      return this.responseI18nService.delete(
        deletedTarification,
        'TARIFICATION',
      );
    } catch (error) {
      this.logger.error('Error deleting Tarrification:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  async findTarrification() {
    try {
      const query = await this.tarificationModel.find().populate('defaultTva');
      return this.responseI18nService.success(query, 'TARIFICATION');
    } catch (error) {
      return this.responseI18nService.handleError(error);
    }
  }

  async getTarificationAndTvas() {
    try {
      // Fetch all TVAs and Tarrifications
      const [tvas, tarrifications] = await Promise.all([
        this.tvaService.findTva(),
        this.findTarrification(),
      ]);

      // Format the response
      const dropdownData = tarrifications.data.map((tarrification) => {
        return {
          _id: tarrification._id,
          designation: tarrification.designation,
          modeConsommation: tarrification.modeConsommation,
          defaultTva: tarrification.defaultTva?._id,
          tvas: tvas.data.map((tva) => ({
            _id: tva._id,
            designation: tva.designation,
            taux: tva.taux,
            isDefault:
              tarrification.defaultTva?._id.toString() === tva._id.toString(),
          })),
        };
      });

      return this.responseI18nService.success(dropdownData, 'TARIFICATION');
    } catch (error) {
      return this.responseI18nService.handleError(error);
    }
  }

  // validation  of Tvas and Tarification
  async validateTvaAndTarification(tarifications: NestedTarificationDto) {
    if (!tarifications.tarificationId || !tarifications.tvaId) {
      throw this.responseI18nService.badRequest('TARIFICATION.invalidId');
    }

    const tarification = await this.findOne(tarifications.tarificationId);
    if (!tarification || !tarification.data?._id) {
      throw this.responseI18nService.notFoundData('TARIFICATION');
    }

    const tva = await this.tvaService.findOne(tarifications.tvaId);
    if (!tva || !tva.data?._id) {
      throw this.responseI18nService.notFoundData('TVA');
    }

    const validation = {
      tarification: tarification.data,
      tva: tva.data,
      caisse: tarifications.caisse,
      prixTTC: tarifications.prixTTC,
      prixHT: tarifications.prixHT,
    };

    return validation;
  }

  async validateMultipleTvasAndTarifications(
    tarifications: NestedTarificationDto[],
  ): Promise<NestedTarificationDto[]> {
    try {
      // Optimized existence checks
      const tvaIds = tarifications.map((tarif) => {
        return tarif.tvaId;
      });
      const tarificationIds = tarifications.map(
        (tarif) => tarif.tarificationId,
      );

      // Fetch all existing TVAs and Tarifications in parallel
      const [existingTvas, existingTarifs] = await Promise.all([
        Promise.all(tvaIds.map((id) => this.tvaService.findOne(id))),
        Promise.all(tarificationIds.map((id) => this.findOne(id))),
      ]);

      // Validate individual items
      for (const tarif of tarifications) {
        const foundTva = existingTvas.find(
          (t) => t && t.data?._id.toString() === tarif.tvaId,
        );
        if (!foundTva || !foundTva.data?._id) {
          throw this.responseI18nService.notFoundData('TVA');
        }

        const foundTarif = existingTarifs.find(
          (t) => t && t.data?._id.toString() === tarif.tarificationId,
        );
        if (!foundTarif || !foundTarif.data?._id) {
          throw this.responseI18nService.notFoundData('TARIFICATION');
        }
      }

      // Validate each tarification after existence checks
      const results = await Promise.all(
        tarifications.map((tarif) => this.validateTvaAndTarification(tarif)),
      );

      const tarificationId = results.map((item) => item.tarification._id);
      const tvaId = results.map((item) => item.tva._id);

      return tarifications.map((item, index) => ({
        tarificationId: tarificationId[index].toString(),
        tvaId: tvaId[index].toString(),
        caisse: item.caisse,
        prixTTC: item.prixTTC,
        prixHT: item.prixHT,
      }));
    } catch (error) {
      this.logger.error(
        'Error validating multiple tvas and tarifications:',
        error,
      );
      return this.responseI18nService.handleError(error);
    }
  }

  async validateTarificationId(ids: string[]): Promise<string[] | any> {
    if (!Array.isArray(ids)) {
      return this.responseI18nService.badRequest('TARIFICATION.badRequest');
    }

    // if (ids.length === 0) {
    //   return [];
    // }

    try {
      const tarifications = await this.tarificationModel
        .find({ _id: { $in: ids } }, { _id: 1 })
        .lean();

      const foundIds = new Set(tarifications.map((t) => t._id.toString()));

      // Find missing IDs
      const missingIds = ids.filter((id) => !foundIds.has(id));

      if (missingIds.length > 0) {
        this.logger.error(
          `Tarification(s) with ID(s) ${missingIds.join(', ')} not found.`,
        );
        return this.responseI18nService.notFoundData('TARIFICATION');
      }

      return Array.from(foundIds);
    } catch (error) {
      return this.responseI18nService.handleError(error);
    }
  }
}
