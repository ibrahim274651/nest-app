import { Test, TestingModule } from '@nestjs/testing';
import { MenuStageController } from './menu-stage.controller';
import { MenuStageService } from './menu-stage.service';

describe('MenuStageController', () => {
  let controller: MenuStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuStageController],
      providers: [MenuStageService],
    }).compile();

    controller = module.get<MenuStageController>(MenuStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
