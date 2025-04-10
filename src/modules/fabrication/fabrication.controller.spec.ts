import { Test, TestingModule } from '@nestjs/testing';
import { FabricationController } from './fabrication.controller';
import { FabricationService } from './fabrication.service';

describe('FabricationController', () => {
  let controller: FabricationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FabricationController],
      providers: [FabricationService],
    }).compile();

    controller = module.get<FabricationController>(FabricationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
