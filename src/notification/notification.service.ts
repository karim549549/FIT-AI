import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './repositories/notification.repository';
import { ProfileService } from '../profile/profile.service';
import { Result } from '@app/common';
import { NotificationSetting } from '@prisma/client';
import { MealWithRecipe } from '@app/common';
import { Cron } from '@nestjs/schedule';
import { FirebaseService } from './services/firebase.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly profileService: ProfileService,
    private readonly firebaseService: FirebaseService,
    private readonly emailService: EmailService,
  ) {}

  private async getProfileId(userId: string): Promise<number | null> {
    const profileResult = await this.profileService.getProfileByUserId(userId);
    return profileResult.success ? profileResult.data.id : null;
  }

  async saveFcmToken(
    userId: string,
    fcmToken: string,
  ): Promise<Result<string>> {
    const profileId = await this.getProfileId(userId);
    if (!profileId) return Result.failure('Profile not found.');

    await this.notificationRepository.saveFcmToken(profileId, fcmToken);
    return Result.success('FCM token saved successfully.');
  }

  async enableNotifications(
    userId: string,
    enable: boolean,
  ): Promise<Result<string>> {
    const profileId = await this.getProfileId(userId);
    if (!profileId) return Result.failure('Profile not found.');

    if (enable) {
      await this.notificationRepository.createNotificationSetting(profileId);
      return Result.success('Notifications enabled successfully.');
    } else {
      await this.notificationRepository.deleteNotificationSetting(profileId);
      return Result.success('Notifications disabled successfully.');
    }
  }

  async getNotificationSettings(
    userId: string,
  ): Promise<Result<NotificationSetting>> {
    const profileId = await this.getProfileId(userId);
    if (!profileId) return Result.failure('Profile not found.');

    const notificationSetting =
      await this.notificationRepository.getNotificationSetting(profileId);
    if (!notificationSetting)
      return Result.failure('Notification settings not found.');

    return Result.success(notificationSetting);
  }
  async updateNotificationSettings(
    userId: string,
    dto: Partial<NotificationSetting>,
  ): Promise<Result<NotificationSetting>> {
    const profileId = await this.getProfileId(userId);
    if (!profileId) return Result.failure('Profile not found.');

    const updatedNotificationSetting =
      await this.notificationRepository.updatedNotificationSetting(
        profileId,
        dto,
      );
    return Result.success(updatedNotificationSetting);
  }
  async addMealNotifications(
    profileId: number,
    meals: MealWithRecipe[],
  ): Promise<Result<string>> {
    if (!profileId) return Result.failure('Profile ID is required.');

    const notificationSetting =
      await this.notificationRepository.getNotificationSetting(profileId);
    if (!notificationSetting || !notificationSetting.push) {
      return Result.failure('User has disabled push notifications.');
    }

    const notifications = meals.map((meal) => ({
      notificationSettingId: notificationSetting.id,
      message: `Reminder: Time for your ${meal.recipe.mealType}!`,
      type: 'PUSH',
      scheduledAt: this.getNotificationTime(meal.day, meal.recipe.mealType),
      isRead: false,
    }));

    await this.notificationRepository.createNotificationsBatch(notifications);
    return Result.success('Meal notifications created successfully.');
  }

  private getNotificationTime(day: number, mealType: string): Date {
    const today = new Date();
    today.setDate(today.getDate() + (day - 1));

    switch (mealType.toLowerCase()) {
      case 'breakfast':
        today.setHours(9, 0, 0);
        break;
      case 'lunch':
        today.setHours(14, 0, 0);
        break;
      case 'dinner':
        today.setHours(18, 0, 0);
        break;
      case 'snack':
        today.setHours(11, 0, 0);
        break;
      default:
        today.setHours(12, 0, 0);
    }

    return today;
  }

  @Cron('*/1 * * * *')
  async processNotifications() {
    const pendingNotifications =
      await this.notificationRepository.getPendingNotifications();
    if (!pendingNotifications.length) return;

    for (const notification of pendingNotifications) {
      const settings = notification.notificationSetting;

      if (settings.push && settings.fcmToken) {
        await this.firebaseService.sendPushNotification(settings.fcmToken);
        notification.isRead = true;
      }

      if (settings.email) {
        await this.emailService.sendNotificationEmail(
          settings.profileId,
          notification,
        );
        notification.isRead = true;
      }
      if (notification.isRead) {
        await this.notificationRepository.archiveNotification(notification);
        await this.notificationRepository.deleteNotification(notification.id);
      }
    }
  }
}
