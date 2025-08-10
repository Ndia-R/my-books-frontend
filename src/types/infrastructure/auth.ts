export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  name: string;
  avatarPath: string;
};

export type AccessToken = {
  accessToken: string;
};
