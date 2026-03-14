export const Role = {
  USER: 'USER',
  CONTENT_EDITOR: 'CONTENT_EDITOR',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
