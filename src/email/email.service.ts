import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(
    @Inject('EMAIL_TRANSPORTER')
    private readonly transporter: nodemailer.Transporter,
  ) {}

  async sendNotificationEmail(setting: any, not: any) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: setting.email,
      subject: 'Notification Alert',
      text: not.message,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
