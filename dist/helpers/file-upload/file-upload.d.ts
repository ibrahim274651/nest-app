export declare const multerOptions: {
    storage: import("multer").StorageEngine;
    fileFilter: (req: any, file: any, callback: any) => void;
};
export declare const deleteFile: (filename: string) => Promise<void>;
export declare const deleteFiles: (filenames: string[]) => Promise<void>;
