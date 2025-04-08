import { CreateArticleDto } from './create-article.dto';
export declare class FindArticlesDto {
    searchText?: string;
    categoryId?: string;
    limit: number;
    page: number;
}
declare const UpdateArticleDto_base: import("@nestjs/common").Type<Partial<CreateArticleDto>>;
export declare class UpdateArticleDto extends UpdateArticleDto_base {
}
export {};
