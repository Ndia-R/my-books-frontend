export const Group = {
  DOMESTIC_USERS: 'domestic-users',
  INTERNATIONAL_USERS: 'international-users',
  CONTENT_EDITORS: 'content-editors',
  MODERATORS: 'moderators',
  ADMINS: 'admins',
} as const;

export type Group = (typeof Group)[keyof typeof Group];
