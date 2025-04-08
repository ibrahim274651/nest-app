import { Test, TestingModule } from '@nestjs/testing';
import { AccompagnementsService } from './accompagnements.service';

describe('AccompagnementsService', () => {
  let service: AccompagnementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccompagnementsService],
    }).compile();

    service = module.get<AccompagnementsService>(AccompagnementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
