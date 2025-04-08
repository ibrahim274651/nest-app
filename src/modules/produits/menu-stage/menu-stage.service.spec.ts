import { Test, TestingModule } from '@nestjs/testing';
import { MenuStageService } from './menu-stage.service';

describe('MenuStageService', () => {
  let service: MenuStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuStageService],
    }).compile();

    service = module.get<MenuStageService>(MenuStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
