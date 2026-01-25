/**
 * 権限セットの種類
 */
export const PermissionSet = {
  GeneralUser: 'general-user',
  PremiumUser: 'premium-user',
  ContentEditor: 'content-editor',
  Moderator: 'moderator',
  Admin: 'admin',
} as const;

export type PermissionSet = (typeof PermissionSet)[keyof typeof PermissionSet];
