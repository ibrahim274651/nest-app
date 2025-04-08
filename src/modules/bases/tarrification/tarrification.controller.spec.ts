import { Test, TestingModule } from '@nestjs/testing';
import { TarrificationController } from './tarrification.controller';
import { TarrificationService } from './tarrification.service';

describe('TarrificationController', () => {
  let controller: TarrificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarrificationController],
      providers: [TarrificationService],
    }).compile();

    controller = module.get<TarrificationController>(TarrificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
