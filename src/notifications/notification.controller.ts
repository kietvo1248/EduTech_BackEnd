import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.notificationService.findByUserId(userId);
  }

  @Get('user/:userId/unread-count')
  async getUnreadCount(@Param('userId') userId: string) {
    const count = await this.notificationService.getUnreadCount(userId);
    return { unreadCount: count };
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
  }

  @Get()
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Post()
  async createNotification(@Body() data: CreateNotificationDto) {
    return this.notificationService.createNotification(data);
  }

  @Put(':id/mark-as-read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Put('mark-multiple-as-read')
  async markMultipleAsRead(@Body('ids') ids: string[]) {
    await this.notificationService.markMultipleAsRead(ids);
    return { message: 'Notifications marked as read' };
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    await this.notificationService.deleteNotification(id);
    return { message: 'Notification deleted successfully' };
  }

  @Delete('user/:userId')
  async deleteByUserId(@Param('userId') userId: string) {
    await this.notificationService.deleteByUserId(userId);
    return { message: 'All notifications for user deleted successfully' };
  }
}
