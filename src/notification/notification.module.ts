import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { FirebaseService } from './services/firebase.service';
import { ProfileModule } from '../profile/profile.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [ProfileModule, EmailModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, FirebaseService],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationModule {}
