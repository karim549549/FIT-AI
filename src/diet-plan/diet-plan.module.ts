import { Module } from '@nestjs/common';
import { DietPlanController } from './diet-plan.controller';
import { DietPlanService } from './diet-plan.service';
import { DietPlanRepository } from './repositories/dietplan.repository';

import { ProfileModule } from '../profile/profile.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [ProfileModule, NotificationModule],
  controllers: [DietPlanController],
  providers: [DietPlanService, DietPlanRepository],
  exports: [DietPlanService],
})
export class DietPlanModule {}
