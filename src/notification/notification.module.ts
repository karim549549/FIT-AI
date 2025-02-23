import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { FirebaseService } from './services/firebase.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationRepository,
    FirebaseService,
    ProfileService,
  ],
  exports: [NotificationRepository, NotificationService],
})
export class NotificationModule {}
