import { Test, TestingModule } from '@nestjs/testing';
import { DietPlanService } from './diet-plan.service';

describe('DietPlanService', () => {
  let service: DietPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietPlanService],
    }).compile();

    service = module.get<DietPlanService>(DietPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
