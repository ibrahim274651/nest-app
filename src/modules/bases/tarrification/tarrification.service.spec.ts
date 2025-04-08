import { Test, TestingModule } from '@nestjs/testing';
import { TarrificationService } from './tarrification.service';

describe('TarrificationService', () => {
  let service: TarrificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TarrificationService],
    }).compile();

    service = module.get<TarrificationService>(TarrificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
