"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppHelperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerIp = exports.codeGenerate = exports.AppHelperService = void 0;
exports.formatDate = formatDate;
const common_1 = require("@nestjs/common");
const os = require("os");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const file_upload_validate_1 = require("./file-upload-validate/file-upload-validate");
let AppHelperService = AppHelperService_1 = class AppHelperService {
    jwtService;
    logger = new common_1.Logger(AppHelperService_1.name);
    defaultPrefix = 'REF';
    defaultLength = 4;
    ipAddress = (0, exports.getServerIp)();
    port = process.env.PORT;
    baseUrl = `http://${this.ipAddress}:${this.port}/images/`;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    extractTokenFromRequest(request) {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Authorization token is missing');
        }
        return token;
    }
    extractUserIdFromToken(request) {
        const token = this.extractTokenFromRequest(request);
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken || !decodedToken.sub) {
            throw new common_1.UnauthorizedException('Invalid token or missing sub claim');
        }
        return decodedToken.sub;
    }
    decodeAccessToken(request) {
        try {
            const accessToken = this.extractTokenFromRequest(request);
            this.logger.debug('Access token extracted successfully');
            const decodedToken = this.jwtService.decode(accessToken);
            if (!decodedToken) {
                throw new common_1.UnauthorizedException('Invalid access token');
            }
            const userInfo = {
                userId: decodedToken['sub'],
                name: decodedToken['name'],
                email: decodedToken['email'],
                username: decodedToken['preferred_username'],
                givenName: decodedToken['given_name'],
                familyName: decodedToken['family_name'],
                roles: decodedToken['realm_access']?.['roles'] || [],
            };
            this.logger.debug('Access token decoded successfully', { userInfo });
            return userInfo;
        }
        catch (error) {
            this.logger.error('Error decoding access token:', error.message, error.stack);
            throw new common_1.UnauthorizedException('Failed to decode access token');
        }
    }
    generateReferenceNumber(prefix, length) {
        const year = new Date().getFullYear();
        const randomValue = this.generateRandomNumber(length || this.defaultLength);
        return `${prefix ? `${prefix}-${year}` : `${this.defaultPrefix}-${year}`}-${randomValue}`;
    }
    generateRandomNumber(length) {
        const max = Math.pow(10, length);
        const randomValue = parseInt((0, crypto_1.randomBytes)(length).toString('hex'), 16) % max;
        return String(randomValue).padStart(length, '0');
    }
    dateFromDay(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        const news = new Date(result).toISOString();
        return news;
    }
    formatImagesUploadUrl = (results) => {
        return results.map((item) => ({
            ...item,
            images: item.images.map((image) => `${image.replace('', this.baseUrl)}`),
        }));
    };
    formatImageUrl = (result) => {
        return {
            ...result,
            images: result.images.map((image) => image.replace('', this.baseUrl)),
        };
    };
    singleImageUrl = (results) => {
        if (!Array.isArray(results))
            return results;
        return results.map((result) => ({
            ...result,
            catalogue: result.catalogue?.id
                ? {
                    _id: result.catalogue.id._id,
                    designation: result.catalogue.id.designation,
                    image: this.baseUrl + (result.catalogue.image || ''),
                }
                : null,
        }));
    };
    mapCatalogResponseWithImageUrl = (results) => {
        console.log(results);
        return {
            ...results,
            catalogue: results.catalogue?.id
                ? {
                    _id: results.catalogue.id._id,
                    designation: results.catalogue.id.designation,
                    image: this.baseUrl + (results.catalogue.image || ''),
                }
                : null,
        };
    };
    sanitizeCatalogDataBeforeSave = (data) => {
        if (!data?.catalogue)
            return data;
        return {
            ...data,
            catalogue: {
                id: data.catalogue.id || '',
                image: data.catalogue.image?.replace(this.baseUrl, '') || '',
            },
        };
    };
    async removeImageUrl(data, imageUrl) {
        if (!this.port)
            throw new Error('Server port is not configured');
        if (!imageUrl.startsWith(this.baseUrl))
            throw new Error('Invalid image URL format');
        const urlImg = imageUrl.replace(this.baseUrl, '');
        const imageIndex = data.images.indexOf(urlImg);
        if (imageIndex === -1)
            throw new Error('Image not found in dataset');
        data.images = data.images.filter((_, index) => index !== imageIndex);
        await (0, file_upload_validate_1.deleteFile)(urlImg);
        return 'Image successfully removed from both dataset and filesystem';
    }
};
exports.AppHelperService = AppHelperService;
exports.AppHelperService = AppHelperService = AppHelperService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AppHelperService);
const codeGenerate = () => {
    return (0, crypto_1.randomUUID)().slice(0, 6);
};
exports.codeGenerate = codeGenerate;
const ignoreInterfacePatterns = [
    /^vEthernet/i,
    /^VirtualBox/i,
    /^VMware/i,
    /^docker/i,
    /^br-/i,
    /^veth/i,
    /^lo/i,
    /^Loopback/i,
    /^Bluetooth/i,
    /^Local Area Connection\*/i,
    /^Connexion au réseau local\*/i,
    /^Connexion réseau Bluetooth/i,
    /^Carte réseau/i,
    /^Connexion réseau/i,
    /^Connexion Ethernet/i,
    /^TAP-/i,
    /^Npcap Loopback/i,
];
const getServerIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        if (ignoreInterfacePatterns.some((pattern) => pattern.test(name))) {
            console.log(`[IGNORED] Interface: ${name}`);
            continue;
        }
        const nets = interfaces[name];
        if (nets) {
            for (const net of nets) {
                if (net.family === 'IPv4' &&
                    !net.internal &&
                    net.address !== '127.0.0.1') {
                    console.log(`[SELECTED] Interface: ${name} → IP: ${net.address}`);
                    return net.address;
                }
            }
        }
    }
    console.warn('⚠️ No suitable external IPv4 address found. Falling back to 127.0.0.1');
    return '127.0.0.1';
};
exports.getServerIp = getServerIp;
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
}
//# sourceMappingURL=app.helper.service.js.map