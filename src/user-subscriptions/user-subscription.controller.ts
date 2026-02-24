import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';

@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) {}

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.userSubscriptionService.findByUserId(userId);
  }

  @Get('user/:userId/active')
  async getActiveSubscription(@Param('userId') userId: string) {
    return this.userSubscriptionService.findActiveSubscription(userId);
  }

  @Get('user/:userId/status/:status')
  async getByUserAndStatus(
    @Param('userId') userId: string,
    @Param('status') status: string,
  ) {
    return this.userSubscriptionService.findByUserAndStatus(userId, status);
  }

  @Get('user/:userId/is-valid')
  async isValid(@Param('userId') userId: string) {
    const isValid = await this.userSubscriptionService.isSubscriptionValid(userId);
    return { isValid };
  }

  @Get(':id')
  async getSubscriptionById(@Param('id') id: string) {
    return this.userSubscriptionService.getSubscriptionById(id);
  }

  @Get()
  async getAllSubscriptions() {
    return this.userSubscriptionService.getAllSubscriptions();
  }

  @Post()
  async createSubscription(@Body() data: any) {
    return this.userSubscriptionService.createSubscription(data);
  }

  @Put(':id')
  async updateSubscription(@Param('id') id: string, @Body() data: any) {
    return this.userSubscriptionService.updateSubscription(id, data);
  }

  @Put(':id/expire')
  async expireSubscription(@Param('id') id: string) {
    return this.userSubscriptionService.expireSubscription(id);
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: string) {
    await this.userSubscriptionService.deleteSubscription(id);
    return { message: 'User subscription deleted successfully' };
  }
}
