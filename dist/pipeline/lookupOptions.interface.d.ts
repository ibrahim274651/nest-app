import { PipelineStage } from 'mongoose';
export type LookupOptions = {
    as: string;
    localField?: string;
    foreignField?: string;
    preserve?: boolean;
    unwind?: boolean;
    let?: Record<string, any>;
    pipeline?: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[];
};
