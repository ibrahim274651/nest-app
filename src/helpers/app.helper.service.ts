import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as os from 'os';
import { randomBytes, randomUUID } from 'crypto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppHelperService {
  private readonly logger = new Logger(AppHelperService.name);
  private defaultPrefix: string = 'REF';
  private defaultLength: number = 4;
  private ipAddress = getServerIp();
  private port = process.env.PORT;
  private baseUrl = `http://${this.ipAddress}:${this.port}/images/`;

  constructor(private readonly jwtService: JwtService) {}

  extractTokenFromRequest(request: Request): string {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    return token;
  }

  extractUserIdFromToken(request: Request): string {
    const token = this.extractTokenFromRequest(request);
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || !decodedToken.sub) {
      throw new UnauthorizedException('Invalid token or missing sub claim');
    }

    return decodedToken.sub;
  }

  generateReferenceNumber(prefix?: string, length?: number): string {
    const year = new Date().getFullYear();
    const randomValue = this.generateRandomNumber(length || this.defaultLength);
    return `${prefix ? `${prefix}-${year}` : `${this.defaultPrefix}-${year}`}-${randomValue}`;
  }

  generateRandomNumber(length: number): string {
    const max = Math.pow(10, length);
    const randomValue = parseInt(randomBytes(length).toString('hex'), 16) % max;
    return String(randomValue).padStart(length, '0');
  }

  dateFromDay(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    const news = new Date(result).toISOString();
    return news;
  }

  formatImagesUploadUrl = (results: any[]) => {
    return results.map((item) => ({
      ...item,
      images: item.images.map((image) => `${image.replace('', this.baseUrl)}`),
    }));
  };

  formatImageUrl = (result: any) => {
    return {
      ...result,
      images: result.images.map((image) => image.replace('', this.baseUrl)),
    };
  };

  singleImageUrl = (results: any[]) => {
    if (!Array.isArray(results)) return results;

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

  mapCatalogResponseWithImageUrl = (results: any) => {
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

  sanitizeCatalogDataBeforeSave = (data: any) => {
    if (!data?.catalogue) return data;

    return {
      ...data,
      catalogue: {
        id: data.catalogue.id || '',
        image: data.catalogue.image?.replace(this.baseUrl, '') || '',
      },
    };
  };
}

export const codeGenerate = () => {
  return randomUUID().slice(0, 6);
};

const ignoreInterfacePatterns: RegExp[] = [
  /^vEthernet/i,
  /^VirtualBox/i,
  /^VMware/i,
  /^docker/i,
  /^br-/i,
  /^veth/i,
  /^lo/i,
  /^Loopback/i,

  // Wireless / Bluetooth
  /^Bluetooth/i,

  // Windows-specific (English)
  /^Local Area Connection\*/i,

  // Windows-specific (French)
  /^Connexion au réseau local\*/i,
  /^Connexion réseau Bluetooth/i,
  /^Carte réseau/i,
  /^Connexion réseau/i,
  /^Connexion Ethernet/i,

  // Miscellaneous
  /^TAP-/i, // VPN TAP adapters
  /^Npcap Loopback/i, // Wireshark/Npcap loopback
];

export const getServerIp = (): string => {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    if (ignoreInterfacePatterns.some((pattern) => pattern.test(name))) {
      console.log(`[IGNORED] Interface: ${name}`);
      continue;
    }

    const nets = interfaces[name];
    if (nets) {
      for (const net of nets) {
        if (
          net.family === 'IPv4' &&
          !net.internal &&
          net.address !== '127.0.0.1'
        ) {
          console.log(`[SELECTED] Interface: ${name} → IP: ${net.address}`);
          return net.address;
        }
      }
    }
  }

  console.warn(
    '⚠️ No suitable external IPv4 address found. Falling back to 127.0.0.1',
  );
  return '127.0.0.1';
};

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(undefined, options);
}
