import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async initializeFirebase() {
    if (!admin.apps.length) {
      try {
        const serviceAccount = JSON.parse(
          process.env.FIREBASE_CREDENTIALS || '{}',
        );

        if (!serviceAccount) {
          this.logger.error('❌ Firebase credentials are missing!');
          return;
        }

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });

        this.logger.log('🔥 Firebase initialized successfully');
      } catch (error) {
        this.logger.error(`❌ Error initializing Firebase: ${error.message}`);
      }
    }
  }
  async sendPushNotification(fcmToken: string) {
    await this.initializeFirebase();

    if (!fcmToken) {
      return;
    }

    const payload: admin.messaging.Message = {
      token: fcmToken,
      notification: {
        title: 'FIT AI Notification',
        body: `You have new notifications!`,
      },
    };

    try {
      // 🔹 Send push notification
      const response = await admin.messaging().send(payload);
      this.logger.log(`✅ Push notification sent successfully: ${response}`);
    } catch (error) {
      this.logger.error(`❌ Error sending push notification: ${error.message}`);
    }
  }
}
