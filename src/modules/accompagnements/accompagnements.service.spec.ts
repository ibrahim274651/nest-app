import { Test, TestingModule } from '@nestjs/testing';
import { Accompagnementervice } from './accompagnements.service';

describe('Accompagnementervice', () => {
  let service: Accompagnementervice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Accompagnementervice],
    }).compile();

    service = module.get<Accompagnementervice>(Accompagnementervice);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
