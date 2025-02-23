import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgressLog, Prisma } from '@prisma/client';

@Injectable()
export class ProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProgressLog(
    profileId: number,
    data: Omit<Prisma.ProgressLogCreateInput, 'profile'>,
  ): Promise<ProgressLog> {
    return this.prisma.progressLog.create({
      data: {
        profile: { connect: { id: profileId } },
        weight: data.weight,
        height: data.height,
        bodyFat: data.bodyFat,
        muscleMass: data.muscleMass,
        water: data.water,
        boneMass: data.boneMass,
        visceralFat: data.visceralFat,
        metabolicAge: data.metabolicAge,
      },
    });
  }

  async getUserProgressLogs(profileId: number): Promise<ProgressLog[]> {
    return this.prisma.progressLog.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
