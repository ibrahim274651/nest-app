import { CategorieType, ConsumptionMode, FabricationType, GlobalStatus, MouvementType, OperationTypeIn, OperationTypeOut, OtherType } from '../enumerations.enum';
export declare class EnumTypeController {
    getCategorieType(): {
        message: string;
        data: CategorieType[];
    };
    getCategorieTypes(): {
        message: string;
        data: CategorieType[];
    };
    getFabricationType(): {
        message: string;
        data: FabricationType.FABRICATION[];
    };
    getOtherMouvementTypes(): {
        message: string;
        data: OtherType[];
    };
    getGeneralMouvementTypes(): {
        message: string;
        data: MouvementType[];
    };
    getIncomingMouvementTypes(): {
        message: string;
        data: OperationTypeIn[];
    };
    getOutgoingMouvementTypes(): {
        message: string;
        data: OperationTypeOut[];
    };
    getTransferStatus(): {
        message: string;
        data: GlobalStatus[];
    };
    getModeTypes(): {
        message: string;
        data: ConsumptionMode[];
    };
}
