import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseI18nService } from 'src/helpers/translate/server-response/response-i18n.service';
import { Promotion } from './bases/promotions/entities/promotion.entity';
import { Tarrification } from './bases/tarrification/entities/tarrification.entity';
import { Accompagnement } from './produits/accompagnements/entities/accompagnement.entity';
import { Article } from './produits/articles/entities/article.entity';
import { Category } from './produits/categories/entities/category.entity';
import { Cuisson } from './produits/cuissons/entities/cuisson.entity';
import { Menu } from './produits/menus/entities/menu.entity';
@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Article.name) private itemModel: Model<Article>,
    @InjectModel(Accompagnement.name) private accModel: Model<Accompagnement>,
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    @InjectModel(Cuisson.name) private cuissonModel: Model<Cuisson>,
    @InjectModel(Tarrification.name) private tarModel: Model<Tarrification>,
    @InjectModel(Promotion.name) private promoModel: Model<Promotion>,

    private readonly responseI18nService: ResponseI18nService,
  ) {}

  // CATALOG
  async isCatalogueUsed(id: string): Promise<void> {
    try {
      const [category, item, acc, cuisson] = await Promise.all([
        this.categoryModel.exists({ 'catalogue.id': id }),
        this.itemModel.exists({ 'catalogue.id': id }),
        this.accModel.exists({ 'catalogue.id': id }),
        this.cuissonModel.exists({ 'catalogue.id': id }),
      ]);

      // Map models to human-readable names
      const modelsInUse = [];
      if (category) modelsInUse.push('Category');
      if (item) modelsInUse.push('Item');
      if (acc) modelsInUse.push('AddOns');
      if (cuisson) modelsInUse.push('Cuisson');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This catalog is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking catalogue usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // CATALOG IMAGES
  async checkImageUsage(imageUrl: string): Promise<void> {
    try {
      const modelsInUse: string[] = [];

      const [category, article, acc, cuisson] = await Promise.all([
        this.categoryModel.findOne({ 'catalogue.image': imageUrl }),
        this.itemModel.findOne({ 'catalogue.image': imageUrl }),
        this.accModel.findOne({ 'catalogue.image': imageUrl }),
        this.cuissonModel.findOne({ 'catalogue.image': imageUrl }),
      ]);

      if (category) modelsInUse.push('Category');
      if (article) modelsInUse.push('Item');
      if (acc) modelsInUse.push('Addons');
      if (cuisson) modelsInUse.push('Cuisson');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `These catalog image(s) are in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking image usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // CATEGORY
  async isCategoryUsed(id: string): Promise<void> {
    try {
      const [item, acc, menu] = await Promise.all([
        this.itemModel.exists({ categorie: id }),
        this.accModel.exists({ categorie: id }),
        this.menuModel.exists({ categorie: id }),
      ]);

      // Map models to human-readable names
      const modelsInUse = [];
      if (item) modelsInUse.push('Item');
      if (acc) modelsInUse.push('AddOns');
      if (menu) modelsInUse.push('Menu');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This category is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking category usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // TVA
  async isTvaUsed(id: string): Promise<void> {
    try {
      const [tarif, item, acc, menu] = await Promise.all([
        this.tarModel.exists({ defaultTva: id }),
        this.itemModel.exists({ 'tarification.tvaId': id }),
        this.accModel.exists({ 'tarification.tvaId': id }),
        this.menuModel.exists({ 'tarification.tvaId': id }),
      ]);

      // Map models to human-readable names
      const modelsInUse = [];
      if (tarif) modelsInUse.push('Tarification');
      if (item) modelsInUse.push('Item');
      if (acc) modelsInUse.push('AddOns');
      if (menu) modelsInUse.push('Menu');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This Tva is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking category usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // TARIFICATION
  async isTarificationUsed(id: string): Promise<void> {
    try {
      const [cat, item, acc, menu] = await Promise.all([
        this.categoryModel.exists({ tarification: id }),
        this.itemModel.exists({ 'tarification.tarificationId': id }),
        this.accModel.exists({ 'tarification.tarificationId': id }),
        this.menuModel.exists({ 'tarification.tarificationId': id }),
      ]);

      // Map models to human-readable names
      const modelsInUse = [];
      if (cat) modelsInUse.push('Category');
      if (item) modelsInUse.push('Item');
      if (acc) modelsInUse.push('AddOns');
      if (menu) modelsInUse.push('Menu');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This tarification is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking tarification usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // FABRICATION
  async isFabricationUsed(id: string): Promise<void> {
    try {
      const itemExists = await this.itemModel.exists({
        'fabrication.fabricationId': id,
      });

      // Map models to human-readable names
      const modelsInUse: string[] = [];
      if (itemExists) modelsInUse.push('Item');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This fabrication is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking fabrication usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // UNITE MEASURE
  async isUniteUsed(id: string): Promise<void> {
    try {
      const itemExists = await this.itemModel.exists({
        'uniteDetails.unite': id,
      });

      // Map models to human-readable names
      const modelsInUse: string[] = [];
      if (itemExists) modelsInUse.push('Item');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This unite of measurement is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking unite usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // ITEM
  async isItemUsed(id: string): Promise<void> {
    try {
      const [promotion, menu, mvt, tansfert, inventory] = await Promise.all([
        this.promoModel.exists({ 'articles.articleId': id }),
        this.menuModel.exists({
          niveaux: { $elemMatch: { articleIds: id } },
        }),
      ]);

      // Map models to human-readable names
      const modelsInUse = [];
      if (promotion) modelsInUse.push('Promotion');
      if (menu) modelsInUse.push('Menu');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This item is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking item usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }

  // MENU STAGE
  async isMenuStageUsed(id: string): Promise<void> {
    try {
      const menuExists = await this.menuModel.exists({
        niveaux: { $elemMatch: { niveauId: id } },
      });

      // Map models to human-readable names
      const modelsInUse: string[] = [];
      if (menuExists) modelsInUse.push('Menu');

      if (modelsInUse.length > 0) {
        throw new ConflictException(
          `This menu stage is in use in the following pages: ${modelsInUse.join(', ')} and cannot be deleted.`,
        );
      }
    } catch (error) {
      this.logger.error('Error checking menu stage usage:', error);
      throw this.responseI18nService.handleError(error);
    }
  }
}
