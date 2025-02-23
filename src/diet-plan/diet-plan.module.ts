import { Module } from '@nestjs/common';
import { DietPlanController } from './diet-plan.controller';
import { DietPlanService } from './diet-plan.service';
import { DietPlanRepository } from './repositories/dietplan.repository';
import { ProfileRepository } from 'src/profile/repositories/profile.repository';
@Module({
  controllers: [DietPlanController],
  providers: [DietPlanService, DietPlanRepository, ProfileRepository],
})
export class DietPlanModule {}
