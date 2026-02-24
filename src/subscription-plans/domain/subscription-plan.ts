export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  features: string[]; // JSON array with strings
  createdAt: Date;
  updatedAt: Date;
}
