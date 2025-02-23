import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  constructor(private readonly transporter: nodemailer.Transporter) {}

  async sendNotificationEmail(setting: any, not: any) {}
}
