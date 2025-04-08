import { FabricationType } from 'src/utils/enumerations.enum';
export declare class CreateFabricationDto {
    designation: string;
    type: FabricationType;
    stock: boolean;
    stockMin: number;
}
