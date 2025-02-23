import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationSetting } from '@prisma/client';
import { NotificationWithNotifcationSetting } from '@app/common';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveFcmToken(profileId: number, fcmToken: string) {
    await this.prisma.notificationSetting.update({
      where: { profileId },
      data: { fcmToken },
    });
  }

  async createNotificationSetting(profileId: number) {
    return this.prisma.notificationSetting.create({
      data: { profileId },
    });
  }

  async deleteNotificationSetting(profileId: number) {
    return this.prisma.notificationSetting.delete({
      where: { profileId },
    });
  }

  async getNotificationSetting(
    profileId: number,
  ): Promise<NotificationSetting | null> {
    return this.prisma.notificationSetting.findUnique({
      where: { profileId },
    });
  }

  async updatedNotificationSetting(
    profileId: number,
    data: Partial<NotificationSetting>,
  ) {
    return this.prisma.notificationSetting.update({
      where: { profileId },
      data,
    });
  }

  async createNotificationsBatch(
    notifications: {
      notificationSettingId: number;
      message: string;
      type: string;
      scheduledAt: Date;
      isRead: boolean;
    }[],
  ) {
    await this.prisma.notification.createMany({
      data: notifications,
    });
  }

  async getPendingNotifications(): Promise<
    NotificationWithNotifcationSetting[] | null
  > {
    return this.prisma.notification.findMany({
      where: {
        scheduledAt: { lte: new Date() },
        isRead: false,
      },
      include: { notificationSetting: true },
    });
  }

  async archiveNotification(notification: any) {
    return this.prisma.archivedNotification.create({
      data: {
        notificationSettingId: notification.notificationSettingId,
        message: notification.message,
        scheduledAt: notification.scheduledAt,
        archivedAt: new Date(),
      },
    });
  }

  async deleteNotification(notificationId: number) {
    return this.prisma.notification.delete({
      where: { id: notificationId },
    });
  }
}
