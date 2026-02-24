export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  status: string; // SubscriptionStatus: ACTIVE, EXPIRED, CANCELLED
  createdAt: Date;
  updatedAt: Date;
}
