import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import * as nodemailer from 'nodemailer';

@Module({
  providers: [
    {
      provide: 'EMAIL_TRANSPORTER',
      useFactory: () => {
        return nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
      },
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
