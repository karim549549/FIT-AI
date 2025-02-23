import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import * as nodemailer from 'nodemailer';
@Module({
  imports: [
    nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
