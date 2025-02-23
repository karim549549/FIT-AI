import { Controller, Get, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { DietPlanService } from './diet-plan.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Result } from '@app/common';
import { CustomRequest } from '@app/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Diet Plans')
@ApiBearerAuth()
@Controller('diet-plans')
export class DietPlanController {
  constructor(private readonly dietPlanService: DietPlanService) {}

  @UseGuards(JwtAuthGuard)
  @Get('generate')
  @ApiOperation({
    summary: 'Generate a diet plan based on user profile & preferences',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Diet plan generated successfully',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async generateDietPlan(@Req() req: CustomRequest) {
    const userId = req.user.id;
    const result = await this.dietPlanService.generateDietPlan(userId);
    return Result.standardResponse(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve the latest diet plan for the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Latest diet plan retrieved successfully',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getLatestDietPlan(@Req() req: CustomRequest) {
    const userId = req.user.id;
    const result = await this.dietPlanService.getUserDietPlan(userId);
    return Result.standardResponse(result);
  }
}
