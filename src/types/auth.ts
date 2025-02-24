export type LoginRequest = {
  email: string;
  password: string;
};

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  avatarUrl: string;
}

export interface AccessToken {
  accessToken: string;
}
