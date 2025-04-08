"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationValues = exports.OperationTypeIn = exports.OperationTypeOut = exports.TransferType = exports.OtherType = exports.ConsumptionMode = exports.MouvementType = exports.FabricationType = exports.CategorieType = exports.GlobalStatus = void 0;
var GlobalStatus;
(function (GlobalStatus) {
    GlobalStatus["EN_ATTENTE"] = "En attente";
    GlobalStatus["APPROUVE"] = "Approuve";
    GlobalStatus["REJECTE"] = "Rejecte";
    GlobalStatus["FACTURE"] = "Facture";
})(GlobalStatus || (exports.GlobalStatus = GlobalStatus = {}));
var CategorieType;
(function (CategorieType) {
    CategorieType["ARTICLE"] = "ARTICLE";
    CategorieType["ACCOMPAGNEMENT"] = "ACCOMPAGNEMENT";
    CategorieType["MENU"] = "MENU";
    CategorieType["FABRICATION"] = "FABRICATION";
})(CategorieType || (exports.CategorieType = CategorieType = {}));
var FabricationType;
(function (FabricationType) {
    FabricationType["FABRICATION"] = "FABRICATION";
})(FabricationType || (exports.FabricationType = FabricationType = {}));
var MouvementType;
(function (MouvementType) {
    MouvementType["ENTREE"] = "ENTREE";
    MouvementType["SORTIE"] = "SORTIE";
    MouvementType["TRANSFERTS_ENTRES"] = "TRANSFERTS_ENTRES";
    MouvementType["ACHATS"] = "ACHATS";
})(MouvementType || (exports.MouvementType = MouvementType = {}));
var ConsumptionMode;
(function (ConsumptionMode) {
    ConsumptionMode["SURPLACE"] = "SURPLACE";
    ConsumptionMode["LIVRAISON"] = "LIVRAISON";
    ConsumptionMode["EMPORTER"] = "A EMPORTER";
})(ConsumptionMode || (exports.ConsumptionMode = ConsumptionMode = {}));
var OtherType;
(function (OtherType) {
    OtherType["ACHAT"] = "ACHAT";
    OtherType["TRANSFERT_ENTRANT"] = "TRANSFERT ENTRANT";
    OtherType["RETOUR_FORNISSEUR"] = "RETOUR FORNISSEUR";
    OtherType["PRODUCTION_INTERNE"] = "PRODUCTION INTERNE ";
    OtherType["INVENTAIRE_POSITIF"] = "INVENTAIRE POSITIF";
    OtherType["VENTE"] = "VENTE";
    OtherType["PERTE"] = "PERTE";
    OtherType["RETOUR_CLIENT"] = "RETOUR CLIENT";
    OtherType["TRANSFERT_SORTANT"] = "TRANSFERT SORTANT";
    OtherType["CONSOMMATION_INTERNE"] = "CONSOMMATION INTERNE";
    OtherType["INVENTAIRE_NEGATIF"] = "INVENTAIRE NEGATIF";
})(OtherType || (exports.OtherType = OtherType = {}));
var TransferType;
(function (TransferType) {
    TransferType["TRANSFERT_SORTIE"] = "TRANSFERT SORTANT";
    TransferType["TRANSFERT_ENTRANT"] = "TRANSFERT ENTRANT";
})(TransferType || (exports.TransferType = TransferType = {}));
var OperationTypeOut;
(function (OperationTypeOut) {
    OperationTypeOut["VENTE"] = "VENTE";
    OperationTypeOut["PERTE"] = "PERTE";
    OperationTypeOut["CONSOMMATION_INTERNE"] = "CONSOMMATION INTERNE";
})(OperationTypeOut || (exports.OperationTypeOut = OperationTypeOut = {}));
var OperationTypeIn;
(function (OperationTypeIn) {
    OperationTypeIn["ACHAT"] = "ACHAT";
    OperationTypeIn["RETOUR_CLIENT"] = "RETOUR CLIENT";
    OperationTypeIn["RETOUR_FORNISSEUR"] = "RETOUR FORNISSEUR";
    OperationTypeIn["PRODUCTION_INTERNE"] = "PRODUCTION INTERNE";
})(OperationTypeIn || (exports.OperationTypeIn = OperationTypeIn = {}));
exports.operationValues = [
    ...Object.values(OperationTypeIn),
    ...Object.values(OperationTypeOut),
    ...Object.values(TransferType),
];
//# sourceMappingURL=enumerations.enum.js.map