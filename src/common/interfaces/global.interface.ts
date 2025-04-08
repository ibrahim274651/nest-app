export type ICategory = {
  _id: string;
  typeFamille: string;
  tarification: ITarification[];
};

// Define Tarification type
export type ITarification = {
  _id: string;
  designation: string;
  consumptionMode: string;
  caisse?: boolean;
  prixTTC?: number;
  prixHT?: number;
};

// Define ItemsData type
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

// Define MvtDetailsData type
export type IMvtDetailsData = {
  _id: string;
  quantite: number;
  itemsData: ItemsData;
};

// Define Movement type
export type IMovement = {
  _id: string;
  reference: string;
  typeMouvement: string;
  storeSource: string;
  typeOperation: string;
  dateMouvement: string;
  mvtDetailsData?: IMvtDetailsData[];
};

// Define Store type
export type IStore = {
  _id: string;
  designation: string;
  status: boolean;
};

// Define Response type for the overall structure
export type MovementDetailResponse = {
  _id: string;
  store: IStore;
  movements: IMovement[];
};

// // Main Mouvement type
// export type IMouvement= {
//   _id?: string;
//   reference: string;
//   motifMouvement: string;
//   typeMouvement: string;
//   fournisseurId: IFournisseur;
//   dateMouvement: string;
//   utilisateurId: string;
//   userInfo: object;
//   movementDetails: IMovementDetail[];
//   createdAt: string;
//   updatedAt: string;
// }

// // Fournisseur type
// export type IFournisseur= {
//   _id?: string;
//   nom: string;
//   prenom: string;
//   telephone: string;
//   nif: string;
//   email: string;
// }

// // Movement Detail type
// export type IMovementDetail= {
//   _id?: string;
//   articleId: string;
//   quantite: number;
//   article?: IArticle;
// }

// // Article type
// type IArticle= {
//   _id?: string;
//   reference: string;
//   categorie: ICategorie;
//   designation: string;
//   seuilMinimum?: number;
//   codeBarre?: string;
//   catalogue: ICatalogue;
//   accompagnement?: any[];
//   tarification: Tarification[];
//   cuisson: boolean;
//   gererStockProduit: boolean;
//   visibleCaisse: boolean;
//   fabrication?: any[];
//   articleGeneric: boolean;
// }

// // Categorie type
// export type ICategorie= {
//   _id: string;
//   designation: string;
// }

// // Catalogue type
// export type ICatalogue= {
//   id: string | null;
//   image: string;
// }

// // Tarification type
// export type Tarification= {
//   tarificationId: ITarificationId;
//   caisse: boolean;
//   tvaId: ITva;
//   prixTTC: number;
//   prixHT: number;
// }

// // TarificationId type
// export type ITarificationId= {
//   _id: string;
//   designation: string;
//   defaultTva: ITva;
//   compte_comptable_vente: string;
//   compte_comptable_collecte: string;
// }

// // Tva type
// export type ITva= {
//   _id: string;
//   designation: string;
//   taux: number;
//   compte_comptable_vente: string;
//   compte_comptable_collecte: string;
// }

// // Store type
// export type IStore= {
//   _id: string;
//   designation: string;
//   stock: boolean;
// }
