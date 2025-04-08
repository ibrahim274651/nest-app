export enum GlobalStatus {
  EN_ATTENTE = 'En attente',
  APPROUVE = 'Approuve',
  REJECTE = 'Rejecte',
  FACTURE = 'Facture',
}

export enum CategorieType {
  ARTICLE = 'ARTICLE',
  ACCOMPAGNEMENT = 'ACCOMPAGNEMENT',
  MENU = 'MENU',
  FABRICATION = 'FABRICATION',
}

export enum FabricationType {
  FABRICATION = 'FABRICATION',
}

export enum MouvementType {
  ENTREE = 'ENTREE',
  SORTIE = 'SORTIE',
  TRANSFERTS_ENTRES = 'TRANSFERTS_ENTRES',
  ACHATS = 'ACHATS',
}

export enum ConsumptionMode {
  SURPLACE = 'SURPLACE',
  LIVRAISON = 'LIVRAISON',
  EMPORTER = 'A EMPORTER',
}

export enum OtherType {
  ACHAT = 'ACHAT',
  TRANSFERT_ENTRANT = 'TRANSFERT ENTRANT',
  RETOUR_FORNISSEUR = 'RETOUR FORNISSEUR',
  PRODUCTION_INTERNE = 'PRODUCTION INTERNE ',
  INVENTAIRE_POSITIF = 'INVENTAIRE POSITIF',
  VENTE = 'VENTE',
  PERTE = 'PERTE',
  RETOUR_CLIENT = 'RETOUR CLIENT',
  TRANSFERT_SORTANT = 'TRANSFERT SORTANT',
  CONSOMMATION_INTERNE = 'CONSOMMATION INTERNE',
  INVENTAIRE_NEGATIF = 'INVENTAIRE NEGATIF',
}

export enum TransferType {
  TRANSFERT_SORTIE = 'TRANSFERT SORTANT',
  TRANSFERT_ENTRANT = 'TRANSFERT ENTRANT',
}

export enum OperationTypeOut {
  VENTE = 'VENTE',
  PERTE = 'PERTE',
  CONSOMMATION_INTERNE = 'CONSOMMATION INTERNE',
}

export enum OperationTypeIn {
  ACHAT = 'ACHAT',
  RETOUR_CLIENT = 'RETOUR CLIENT',
  RETOUR_FORNISSEUR = 'RETOUR FORNISSEUR',
  PRODUCTION_INTERNE = 'PRODUCTION INTERNE',
}

export type OperationType = OperationTypeIn | OperationTypeOut | TransferType;

export const operationValues = [
  ...Object.values(OperationTypeIn),
  ...Object.values(OperationTypeOut),
  ...Object.values(TransferType),
];
