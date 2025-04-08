import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LookupOptions } from './lookupOptions.interface';

@Injectable()
export class PipelineService {
  constructor() // @InjectModel(Cuisson.name) private readonly cuissonModel: Model<Cuisson>,
  // @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  // @InjectModel(Catalogue.name)
  // private readonly catalogModel: Model<Catalogue>,
  // @InjectModel(Tva.name) private readonly tvaModel: Model<Tva>,
  // @InjectModel(Tarrification.name)
  // private readonly tarrifModel: Model<Tarrification>,
  // @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  // @InjectModel(Menu.name) private readonly menuModel: Model<Menu>,
  // @InjectModel(Accompagnement.name)
  // private readonly addOnModel: Model<Accompagnement>,
  // @InjectModel(Fabrication.name)
  // private readonly fabModel: Model<Fabrication>,
  // @InjectModel(UniteMesure.name)
  // private readonly uniteModel: Model<UniteMesure>,
  // @InjectModel(Promotion.name) private readonly promoModel: Model<Promotion>,
  {}

  private lookupStage(options: LookupOptions, from: string) {
    console.log('Generated Lookup Options:', JSON.stringify(options, null, 2));

    // Construct base lookup object
    const lookup: any = { from, as: options.as };

    // If using 'pipeline', exclude 'localField' and 'foreignField'
    if (options.pipeline) {
      lookup.pipeline = options.pipeline;
      if (options.let) {
        lookup.let = options.let;
      }
    } else {
      lookup.localField = options.localField;
      lookup.foreignField = options.foreignField;
    }

    return { $lookup: lookup };
  }

  private unwindStage(as: string, preserve: boolean = false) {
    return {
      $unwind: {
        path: `$${as}`,
        preserveNullAndEmptyArrays: preserve,
      },
    };
  }

  private generatePipeline(model: Model<any>, options: LookupOptions) {
    const shouldUnwind = options.unwind ?? true;
    const preserve = options.preserve ?? false;

    const pipeline: any[] = [this.lookupStage(options, model.collection.name)];

    if (shouldUnwind) {
      pipeline.push(this.unwindStage(options.as, preserve));
    }

    return pipeline;
  }

  // Methods for specific models
  // categories(options: LookupOptions) {
  //   return this.generatePipeline(this.categoryModel, options);
  // }

  // catalogues(options: LookupOptions) {
  //   return this.generatePipeline(this.catalogModel, options);
  // }

  // promotions(options: LookupOptions) {
  //   return this.generatePipeline(this.promoModel, options);
  // }

  // tarifications(options: LookupOptions) {
  //   return this.generatePipeline(this.tarrifModel, options);
  // }

  // tvas(options: LookupOptions) {
  //   return this.generatePipeline(this.tvaModel, options);
  // }

  // articles(options: LookupOptions) {
  //   return this.generatePipeline(this.articleModel, options);
  // }

  // menus(options: LookupOptions) {
  //   return this.generatePipeline(this.menuModel, options);
  // }

  // cuissons(options: LookupOptions) {
  //   return this.generatePipeline(this.cuissonModel, options);
  // }

  // accompagnements(options: LookupOptions) {
  //   return this.generatePipeline(this.addOnModel, options);
  // }

  // fabrications(options: LookupOptions) {
  //   return this.generatePipeline(this.fabModel, options);
  // }

  // unites(options: LookupOptions) {
  //   return this.generatePipeline(this.uniteModel, options);
  // }
}
