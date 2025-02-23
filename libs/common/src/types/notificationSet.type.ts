import { Notification, NotificationSetting } from '@prisma/client';

export type NotificationWithNotifcationSetting = Notification & {
  notificationSetting: NotificationSetting;
};
