export declare enum ConsumptionMode {
    SURPLACE = 0,
    LIVRAISON = 1,
    EMPORTER = 2
}
export interface IUnite {
    unite: string;
    cond: number;
    prixCond: number;
}
export interface ICatalog {
    id: string;
    image: string;
}
export interface ITarification {
    tarification: string;
    caisse: boolean;
    tvaId: string;
    prixTTC: number;
    prixHT: number;
}
export interface IFabrication {
    fabricationId: string;
    quantite: number;
    part: number;
    stockProduitArticle: boolean;
}
