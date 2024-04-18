export class KakaotokenDto {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;

  static of(
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number,
    scope: string,
    refresh_token_expires_in: number,
  ): KakaotokenDto {
    return {
      access_token,
      token_type,
      refresh_token,
      expires_in,
      scope,
      refresh_token_expires_in,
    };
  }
}
