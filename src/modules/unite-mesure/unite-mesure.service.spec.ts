import { Test, TestingModule } from '@nestjs/testing';
import { UniteMesureService } from './unite-mesure.service';

describe('UniteMesureService', () => {
  let service: UniteMesureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniteMesureService],
    }).compile();

    service = module.get<UniteMesureService>(UniteMesureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
