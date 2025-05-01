// bot/handlers/subscriptionHandler.ts
import { getUserSubscription } from '../../db/userSubscription';

/**
 * İstifadəçinin premium abunəliyini yoxlayır.
 * Premium funksiyaya icazə varsa true, yoxsa false qaytarır.
 */
export async function checkUserPremium(userId: string): Promise<boolean> {
  const sub = await getUserSubscription(userId);
  // Premium statusu və müddət yoxlanılır
  return !!sub && sub.isActive && (!sub.expiresAt || new Date(sub.expiresAt) > new Date());
}