import { Injectable } from '@nestjs/common';
import { NotificationRepositoryAbstract } from './infrastructure/persistence/document/repositories/notification.repository.abstract';
import { Notification } from './domain/notification';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepositoryAbstract) {}

  async createNotification(data: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    return this.notificationRepository.create(data);
  }

  async getNotificationById(id: string): Promise<Notification | null> {
    return this.notificationRepository.findById(id);
  }

  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationRepository.findAll();
  }

  async deleteNotification(id: string): Promise<void> {
    return this.notificationRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return this.notificationRepository.findByUserId(userId);
  }

  async markAsRead(id: string): Promise<Notification | null> {
    return this.notificationRepository.markAsRead(id);
  }

  async markMultipleAsRead(ids: string[]): Promise<void> {
    return this.notificationRepository.markMultipleAsRead(ids);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.getUnreadCount(userId);
  }

  async deleteByUserId(userId: string): Promise<void> {
    return this.notificationRepository.deleteByUserId(userId);
  }
}
