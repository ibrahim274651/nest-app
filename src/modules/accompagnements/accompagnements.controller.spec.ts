import { Test, TestingModule } from '@nestjs/testing';
import { AccompagnementController } from './accompagnements.controller';
import { Accompagnementervice } from './accompagnements.service';

describe('AccompagnementController', () => {
  let controller: AccompagnementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccompagnementController],
      providers: [Accompagnementervice],
    }).compile();

    controller = module.get<AccompagnementController>(AccompagnementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
