import { Test, TestingModule } from '@nestjs/testing';
import { UniteMesureController } from './unite-mesure.controller';
import { UniteMesureService } from './unite-mesure.service';

describe('UniteMesureController', () => {
  let controller: UniteMesureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniteMesureController],
      providers: [UniteMesureService],
    }).compile();

    controller = module.get<UniteMesureController>(UniteMesureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
