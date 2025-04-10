import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NextFunction } from 'express';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import {
  NestedArticleSchema,
  NestedArticle,
} from 'src/common/article.embedabble';

@Schema({ timestamps: true, versionKey: false })
export class Promotion extends Document {
  @Prop({ type: String, required: true, unique: true })
  designation: string;

  @Prop({ type: Number, required: true })
  quantite: number;

  @Prop({ type: Number, required: false, default: 0 })
  bonus: number;

  @Prop({ type: Date, required: false })
  dateDebut: Date;

  @Prop({ type: Date, required: false })
  dateFin: Date;

  @Prop({ type: Boolean, default: false, required: false })
  periodeIllimite: boolean;

  @Prop({ type: [NestedArticleSchema], required: false, default: [] })
  articles: NestedArticle[];
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);

PromotionSchema.pre<Promotion>('save', async function (next: NextFunction) {
  try {
    const existingPromotions = await this.model(Promotion.name).find({
      designation: this.designation,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
    });

    if (existingPromotions.length > 0) {
      return next(
        new ConflictException({
          message: 'Une promotion avec les mêmes dates existe déjà',
          statusCode: HttpStatus.CONFLICT,
        }),
      );
    }

    // Validation for limited-time promotion
    if (!this.periodeIllimite && (!this.dateDebut || !this.dateFin)) {
      return next(
        new BadRequestException({
          message:
            'Date de début et date de fin sont obligatoires pour une promotion limitée',
          statusCode: HttpStatus.BAD_REQUEST,
        }),
      );
    }

    // Validation for articles and bonus
    if (this.articles && Array.isArray(this.articles)) {
      for (const article of this.articles) {
        if (article.offert && this.bonus === 0) {
          return next(
            new BadRequestException({
              message:
                'Le bonus doit être supérieur à 0 lorsque "offert" est activé.',
              statusCode: HttpStatus.BAD_REQUEST,
            }),
          );
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// PromotionSchema.pre<Promotion>('save', async function (next: NextFunction) {
//   try {
//     // Check if the promotion already exists with the same designation and dates
//     const existingPromotions = await this.model(Promotion.name).find({
//       designation: this.designation,
//       dateDebut: this.dateDebut,
//       dateFin: this.dateFin,
//     });

//     if (existingPromotions.length > 0) {
//       return next(new Error('PROMOTION_EXIST'));
//     }

//     // Validation for limited-time promotion
//     if (!this.periodeIllimite && (!this.dateDebut || !this.dateFin)) {
//       return next(new Error('DATE_REQUIRED'));
//     }

//     // Validation for articles and bonus
//     if (this.articles && Array.isArray(this.articles)) {
//       for (const article of this.articles) {
//         if (article.offert && this.bonus === 0) {
//           return next(new Error('BONUS_REQUIRED'));
//         }
//       }
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });
