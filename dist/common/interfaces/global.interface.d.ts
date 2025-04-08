export type ICategory = {
    _id: string;
    typeFamille: string;
    tarification: ITarification[];
};
export type ITarification = {
    _id: string;
    designation: string;
    consumptionMode: string;
    caisse?: boolean;
    prixTTC?: number;
    prixHT?: number;
};
export type ItemsData = {
    _id: string;
    reference: string;
    categorie: string;
    designation: string;
    codeBarre: string;
    catalogue: {
        id: string;
        image: string;
    };
    accompagnement: any[];
    cuisson: boolean;
    gererStockProduit: boolean;
    visibleCaisse: boolean;
    fabrication: any[];
    articleGeneric: boolean;
    tarification: ITarification[];
};
export type IMvtDetailsData = {
    _id: string;
    quantite: number;
    itemsData: ItemsData;
};
export type IMovement = {
    _id: string;
    reference: string;
    typeMouvement: string;
    storeSource: string;
    typeOperation: string;
    dateMouvement: string;
    mvtDetailsData?: IMvtDetailsData[];
};
export type IStore = {
    _id: string;
    designation: string;
    status: boolean;
};
export type MovementDetailResponse = {
    _id: string;
    store: IStore;
    movements: IMovement[];
};
