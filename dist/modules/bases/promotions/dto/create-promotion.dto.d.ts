import { NestedArticleDto } from '../../../../common/article.embedabble';
export declare class CreatePromotionDto {
    designation: string;
    quantite: number;
    bonus: number;
    dateDebut: Date;
    dateFin: Date;
    periodeIllimite: boolean;
    articles: NestedArticleDto[];
}
