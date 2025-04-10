import { Test, TestingModule } from '@nestjs/testing';
import { TvaController } from './tva.controller';
import { TvaService } from './tva.service';

describe('TvaController', () => {
  let controller: TvaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvaController],
      providers: [TvaService],
    }).compile();

    controller = module.get<TvaController>(TvaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
