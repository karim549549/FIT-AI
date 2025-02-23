import { Injectable } from '@nestjs/common';
import { Meal } from '@prisma/client';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('meal-notification', {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  async addNotification(data: { profileId: number; meals: Meal[] }) {
    await this.queue.add('schedule-meal-notification', data);
  }
}
