import { Test, TestingModule } from '@nestjs/testing';
import { CuissonsController } from './cuissons.controller';
import { CuissonsService } from './cuissons.service';

describe('CuissonsController', () => {
  let controller: CuissonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuissonsController],
      providers: [CuissonsService],
    }).compile();

    controller = module.get<CuissonsController>(CuissonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
