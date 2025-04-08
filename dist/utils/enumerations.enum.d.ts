export declare enum GlobalStatus {
    EN_ATTENTE = "En attente",
    APPROUVE = "Approuve",
    REJECTE = "Rejecte",
    FACTURE = "Facture"
}
export declare enum CategorieType {
    ARTICLE = "ARTICLE",
    ACCOMPAGNEMENT = "ACCOMPAGNEMENT",
    MENU = "MENU",
    FABRICATION = "FABRICATION"
}
export declare enum FabricationType {
    FABRICATION = "FABRICATION"
}
export declare enum MouvementType {
    ENTREE = "ENTREE",
    SORTIE = "SORTIE",
    TRANSFERTS_ENTRES = "TRANSFERTS_ENTRES",
    ACHATS = "ACHATS"
}
export declare enum ConsumptionMode {
    SURPLACE = "SURPLACE",
    LIVRAISON = "LIVRAISON",
    EMPORTER = "A EMPORTER"
}
export declare enum OtherType {
    ACHAT = "ACHAT",
    TRANSFERT_ENTRANT = "TRANSFERT ENTRANT",
    RETOUR_FORNISSEUR = "RETOUR FORNISSEUR",
    PRODUCTION_INTERNE = "PRODUCTION INTERNE ",
    INVENTAIRE_POSITIF = "INVENTAIRE POSITIF",
    VENTE = "VENTE",
    PERTE = "PERTE",
    RETOUR_CLIENT = "RETOUR CLIENT",
    TRANSFERT_SORTANT = "TRANSFERT SORTANT",
    CONSOMMATION_INTERNE = "CONSOMMATION INTERNE",
    INVENTAIRE_NEGATIF = "INVENTAIRE NEGATIF"
}
export declare enum TransferType {
    TRANSFERT_SORTIE = "TRANSFERT SORTANT",
    TRANSFERT_ENTRANT = "TRANSFERT ENTRANT"
}
export declare enum OperationTypeOut {
    VENTE = "VENTE",
    PERTE = "PERTE",
    CONSOMMATION_INTERNE = "CONSOMMATION INTERNE"
}
export declare enum OperationTypeIn {
    ACHAT = "ACHAT",
    RETOUR_CLIENT = "RETOUR CLIENT",
    RETOUR_FORNISSEUR = "RETOUR FORNISSEUR",
    PRODUCTION_INTERNE = "PRODUCTION INTERNE"
}
export type OperationType = OperationTypeIn | OperationTypeOut | TransferType;
export declare const operationValues: (OperationTypeIn | OperationTypeOut | TransferType)[];
