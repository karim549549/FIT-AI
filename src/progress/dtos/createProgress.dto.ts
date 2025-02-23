import { IsNumber } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsNumber()
  bodyFat: number;

  @IsNumber()
  muscleMass: number;

  @IsNumber()
  water: number;

  @IsNumber()
  boneMass: number;

  @IsNumber()
  visceralFat: number;

  @IsNumber()
  metabolicAge: number;
}
