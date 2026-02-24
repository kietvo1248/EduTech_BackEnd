import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';

@Controller('subscription-plans')
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Get('name/:name')
  async getPlanByName(@Param('name') name: string) {
    return this.subscriptionPlanService.findByName(name);
  }

  @Get(':id')
  async getPlanById(@Param('id') id: string) {
    return this.subscriptionPlanService.getPlanById(id);
  }

  @Get()
  async getAllPlans() {
    return this.subscriptionPlanService.getAllPlans();
  }

  @Post()
  async createPlan(@Body() data: any) {
    return this.subscriptionPlanService.createPlan(data);
  }

  @Put(':id')
  async updatePlan(@Param('id') id: string, @Body() data: any) {
    return this.subscriptionPlanService.updatePlan(id, data);
  }

  @Delete(':id')
  async deletePlan(@Param('id') id: string) {
    await this.subscriptionPlanService.deletePlan(id);
    return { message: 'Subscription plan deleted successfully' };
  }
}
