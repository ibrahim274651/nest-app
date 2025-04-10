import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Catalogue } from './entities/catalogue.entity';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateCatalogueDto,
  DeleteImageDto,
  OtherImageDto,
} from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';

import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';
import { AppHelperService, getServerIp } from 'src/helpers/app.helper.service';
import { deleteFiles } from 'src/helpers/file-upload/file-upload';
// import { VerificationService } from 'src/verification.service';

@Injectable()
export class CatalogueService {
  private readonly logger = new Logger(CatalogueService.name);
  private ipAddress = getServerIp();
  private port = process.env.PORT;
  private baseUrl = `http://${this.ipAddress}:${this.port}/images/`;

  constructor(
    @InjectModel(Catalogue.name)
    private readonly catalogueDocument: Model<Catalogue>,
    private readonly responseI18nService: ResponseI18nService,
    // private readonly verificationService: VerificationService,
    private readonly appHelperService: AppHelperService,
  ) {}

  async create(
    createCatalogueDto: CreateCatalogueDto,
    files: Express.Multer.File[],
  ) {
    try {
      // if (!files || files.length === 0 || !files[0].fieldname) {
      //   return this.responseI18nService.validationError({
      //     key: 'MISSING',
      //     fieldName: 'FILE',
      //   });
      // }

      const imageUrls = files.map((file) => file.filename);

      const updateDto = {
        ...createCatalogueDto,
        images: imageUrls,
      };

      const catalogueCatalogue = await this.catalogueDocument.create(updateDto);
      if (!catalogueCatalogue) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }
      return this.responseI18nService.create(catalogueCatalogue, 'CATALOGUE');
    } catch (error) {
      return this.responseI18nService.handleError(error);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { take, skip, order, search } = pageOptionsDto;

    // try {
    if (skip < 0 || (take && take < 1)) {
      throw this.responseI18nService.badRequest('PAGINATION');
    }

    const filter: any = {};
    if (search) {
      filter.designation = { $regex: search, $options: 'i' };
    }

    const results = await this.catalogueDocument
      .find(filter)
      .sort({ createdAt: order === 'DESC' ? -1 : 1 })
      .skip(skip)
      .limit(take ?? 10)
      .lean()
      .exec();

    // maps images
    const formatData = this.appHelperService.formatImagesUploadUrl(results);
    const itemCount = await this.catalogueDocument.countDocuments(filter);
    return this.responseI18nService.fetchWithPagination(
      formatData,
      itemCount,
      pageOptionsDto,
      'CATALOGUE',
    );
  }

  async dropDownForCatalogue() {
    try {
      const catalogues = await this.catalogueDocument
        .find()
        .sort({ designation: 1 })
        .select('designation images')
        .lean();

      // maps images
      const formatData =
        this.appHelperService.formatImagesUploadUrl(catalogues);

      return this.responseI18nService.success(formatData, 'CATALOGUE');
    } catch (error) {
      this.logger.error(error);
      return this.responseI18nService.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const catalogue = await this.catalogueDocument.findById(id).lean();
      if (!catalogue) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }
      // maps images
      const formatData = this.appHelperService.formatImageUrl(catalogue);

      return this.responseI18nService.success(formatData, 'CATALOGUE');
    } catch (error) {
      this.logger.error(error);
      return this.responseI18nService.handleError(error);
    }
  }

  async update(
    id: string,
    updateCatalogueDto: UpdateCatalogueDto,
    files: Express.Multer.File[],
  ) {
    try {
      if (!files || files.length === 0 || !files[0].fieldname) {
        return this.responseI18nService.validationError({
          key: 'MISSING',
          fieldName: 'FILE',
        });
      }

      const imageUrls = files.map((file) => file.filename);

      const updateDto = {
        ...updateCatalogueDto,
        images: imageUrls,
      };

      const catalogue = await this.catalogueDocument.findById(id);
      if (!catalogue) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }

      const query = await this.catalogueDocument.findByIdAndUpdate(
        { _id: id },
        updateDto,
      );
      if (!query) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }
      return this.responseI18nService.update(query, 'CATALOGUE');
    } catch (error) {
      this.logger.error(error);
      return this.responseI18nService.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const catalogue = await this.catalogueDocument.findById(id);
      if (!catalogue) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }

      // Check if the catalog is being used in related models
      // await this.verificationService.isCatalogueUsed(id);

      if (catalogue.images && catalogue.images.length > 0) {
        await deleteFiles(catalogue.images);
      }

      const deleted = await this.catalogueDocument.findByIdAndDelete(id);

      if (deleted) {
        return this.responseI18nService.delete(deleted, 'CATALOGUE');
      } else {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }
    } catch (error) {
      this.logger.error('Error deleting catalogue:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  async addImageToOtherImage(
    id: string,
    otherImageDto: OtherImageDto,
    files: Express.Multer.File[],
  ) {
    try {
      this.validateFiles(files);
      const imageUrls = this.mapFileUrls(files);
      otherImageDto.images = imageUrls;

      // Process all images with Sharp after Multer saves them
      // const processedFilePaths = await processImagesWithSharp(files);
      // console.log('filePaths:', processedFilePaths);

      const catalogue = await this.catalogueDocument.findOne({ _id: id });
      if (!catalogue) {
        await this.handleCatalogueNotFound(imageUrls);
        return this.responseI18nService.notFoundData('CATALOGUE');
      }

      // Append new images to existing images
      catalogue.images = [...catalogue.images, ...imageUrls];
      const created = await catalogue.save();
      if (!created) {
        await deleteFiles(catalogue.images);
      }
      const formattedData = this.appHelperService.formatImageUrl(
        catalogue.toObject(),
      );

      return this.responseI18nService.update(formattedData, 'CATALOGUE');
    } catch (error) {
      console.error(error);
      await this.handleError(files, error);
      return this.responseI18nService.handleError(error);
    }
  }

  async deleteImageFromOtherImage(id: string, dto: DeleteImageDto) {
    try {
      const catalogue = await this.catalogueDocument.findById(id);
      if (!catalogue) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }

      const urlImg = dto.url.replace(this.baseUrl, '');

      // Check where the image is being used across related models
      // await this.verificationService.checkImageUsage(urlImg);

      // Check if the image exists in the images array
      const imageIndex = catalogue.images.indexOf(urlImg);
      if (imageIndex === -1) {
        return this.responseI18nService.notFoundData('CATALOGUE');
      }

      // Remove the image from the array
      catalogue.images = catalogue.images.filter(
        (item, index) => index !== imageIndex,
      );
      await catalogue.save();

      return this.responseI18nService.update(catalogue, 'CATALOGUE');
    } catch (error) {
      this.logger.error('Error deleting image from other images:', error);
      return this.responseI18nService.handleError(error);
    }
  }

  private validateFiles(files: Express.Multer.File[]) {
    if (!files || !Array.isArray(files) || files.length === 0) {
      throw new Error('No files uploaded');
    }
  }

  // Map file URLs from uploaded files
  private mapFileUrls(images: Express.Multer.File[]): string[] {
    return images.map((file) => file.filename);
  }

  // Handle case when catalogue is not found
  private async handleCatalogueNotFound(imageUrls: string[]) {
    await deleteFiles(imageUrls);
  }

  // Update catalogue images and save changes
  private async updateCatalogueImages(catalogue: any, imageUrls: string[]) {
    catalogue.images.push(...imageUrls);

    const updatedCatalogue = await catalogue.save();
    if (!updatedCatalogue) {
      throw new Error('Failed to save updated catalogue');
    }
  }

  // Handle errors by cleaning up files and logging
  private async handleError(files: Express.Multer.File[], error: any) {
    if (files && Array.isArray(files)) {
      const fileNames = files.map((file) => file.filename);
      await deleteFiles(fileNames);
    } else {
      this.logger.warn('No files to delete');
    }

    this.logger.error('Error adding image to catalogue:', error);
  }
}
