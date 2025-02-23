import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
import { ProfileModule } from './profile/profile.module';
import { DietPlanModule } from './diet-plan/diet-plan.module';
import { NotificationModule } from './notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';

import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    RecipesModule,
    ProfileModule,
    DietPlanModule,
    NotificationModule,
    ScheduleModule.forRoot(),
    EmailModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
