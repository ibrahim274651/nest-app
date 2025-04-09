"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = exports.deleteFile = exports.multerOptions = void 0;
const multer_1 = require("multer");
const path = require("path");
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
exports.multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/images',
        filename: (req, file, callback) => {
            const uploadPath = './uploads/images';
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, ext);
            let filename = `${baseName}${ext}`;
            let filePath = path.join(uploadPath, filename);
            if ((0, fs_1.existsSync)(filePath)) {
                filename = `${baseName}-${Date.now()}${ext}`;
                filePath = path.join(uploadPath, filename);
            }
            callback(null, filename);
        },
    }),
    fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'image/avif',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new common_1.BadRequestException('Invalid file type'), false);
        }
    },
};
const deleteFile = async (filename) => {
    const uploadsDir = path.join(process.cwd(), 'uploads', 'images');
    const filePath = path.join(uploadsDir, filename);
    try {
        await fs_1.promises.unlink(filePath);
        console.log(`Successfully deleted: ${filePath}`);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            console.warn(`File ${filename} not found in uploads directory`);
        }
        else {
            console.error(`Error deleting file ${filename}:`, err);
            throw new Error(`Failed to delete file: ${err.message}`);
        }
    }
};
exports.deleteFile = deleteFile;
const deleteFiles = async (filenames) => {
    if (!Array.isArray(filenames)) {
        throw new TypeError('Expected array of filenames');
    }
    const deletionPromises = filenames.map(async (filename) => {
        try {
            await (0, exports.deleteFile)(filename);
        }
        catch (error) {
            console.error(`Failed to delete ${filename}:`, error.message);
            throw error;
        }
    });
    await Promise.all(deletionPromises);
};
exports.deleteFiles = deleteFiles;
//# sourceMappingURL=file-upload.js.map