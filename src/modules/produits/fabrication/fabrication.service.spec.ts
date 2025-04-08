import { Test, TestingModule } from '@nestjs/testing';
import { FabricationService } from './fabrication.service';

describe('FabricationService', () => {
  let service: FabricationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FabricationService],
    }).compile();

    service = module.get<FabricationService>(FabricationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
