export type User = {
  id: number;
  username: string;
  password: string;
};

export type JwtKeys = {
  access_token: string;
  refresh_token: string;
};