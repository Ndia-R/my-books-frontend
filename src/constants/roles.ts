/**
 * UIロールの種類
 */
export const RoleType = {
  GeneralUser: 'ui:general-user',
  PremiumUser: 'ui:premium-user',
  ContentEditor: 'ui:content-editor',
  Moderator: 'ui:moderator',
  Admin: 'ui:admin',
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];
