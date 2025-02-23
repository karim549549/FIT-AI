import { Test, TestingModule } from '@nestjs/testing';
import { DietPlanController } from './diet-plan.controller';

describe('DietPlanController', () => {
  let controller: DietPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietPlanController],
    }).compile();

    controller = module.get<DietPlanController>(DietPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
