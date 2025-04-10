import { Test, TestingModule } from '@nestjs/testing';
import { TarificationService } from './tarification.service';

describe('TarificationService', () => {
  let service: TarificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TarificationService],
    }).compile();

    service = module.get<TarificationService>(TarificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
