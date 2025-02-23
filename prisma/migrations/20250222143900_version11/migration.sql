-- AlterTable
ALTER TABLE "ArchivedNotification" ALTER COLUMN "scheduledAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'PUSH',
ALTER COLUMN "scheduledAt" DROP NOT NULL,
ALTER COLUMN "scheduledAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "NotificationSetting" ADD COLUMN     "fcmToken" TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
