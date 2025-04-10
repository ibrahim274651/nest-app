import { Test, TestingModule } from '@nestjs/testing';
import { CuissonsService } from './cuissons.service';

describe('CuissonsService', () => {
  let service: CuissonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuissonsService],
    }).compile();

    service = module.get<CuissonsService>(CuissonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
