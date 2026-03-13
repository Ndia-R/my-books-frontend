export const SubscriptionPlan = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
} as const;

export type SubscriptionPlan =
  (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];
