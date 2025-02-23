import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { ProgressRepository } from './repositories/progress.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileRepository } from 'src/profile/repositories/profile.repository';

@Module({
  controllers: [ProgressController],
  providers: [
    ProgressService,
    ProgressRepository,
    PrismaService,
    ProfileRepository,
  ],
  exports: [ProgressService],
})
export class ProgressModule {}
