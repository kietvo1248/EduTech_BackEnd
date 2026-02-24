export interface Session {
  id: string;
  userId: string;
  hashedRt: string;
  deviceInfo: string;
  ipAddress: string;
  expiresAt: Date;
  createdAt: Date;
}
