import { IsString, IsInt, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @IsString()
  gender: string;

  @IsInt()
  height: number;

  @IsInt()
  weight: number;

  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @IsInt()
  activityLevel: number;

  @IsInt()
  goal: number;

  @IsBoolean()
  allowNotifications: boolean;
}
