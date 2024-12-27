export interface LoginResponse {
  accessToken: string;
  username: string;
  roles: string[];
}

export interface AccessTokenResponse {
  accessToken: string;
}
