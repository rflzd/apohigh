// db/userSubscription.ts
export interface UserSubscription {
  userId: string;
  isActive: boolean;
  expiresAt?: string; // ISO format tarix
}

/**
 * Mock DB funksiyası – buranı real verilənlər bazası ilə əvəz etmək olar.
 */
const mockDB: Record<string, UserSubscription> = {
  '123': { userId: '123', isActive: true, expiresAt: '2099-12-31T23:59:59Z' },
  '124': { userId: '124', isActive: false }
};

export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  return mockDB[userId] || null;
}