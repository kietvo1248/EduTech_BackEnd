export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  provider: string; // MOMO or VNPAY
  providerRefId: string;
  status: string; // TransactionStatus: PENDING, SUCCESS, FAILED
  createdAt: Date;
  updatedAt: Date;
}
