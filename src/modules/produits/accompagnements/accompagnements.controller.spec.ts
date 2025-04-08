import { Test, TestingModule } from '@nestjs/testing';
import { AccompagnementsController } from './accompagnements.controller';
import { AccompagnementsService } from './accompagnements.service';

describe('AccompagnementsController', () => {
  let controller: AccompagnementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccompagnementsController],
      providers: [AccompagnementsService],
    }).compile();

    controller = module.get<AccompagnementsController>(
      AccompagnementsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
