import { Test, TestingModule } from '@nestjs/testing';
import { TarificationController } from './tarification.controller';
import { TarificationService } from './tarification.service';

describe('TarificationController', () => {
  let controller: TarificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarificationController],
      providers: [TarificationService],
    }).compile();

    controller = module.get<TarificationController>(TarificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
