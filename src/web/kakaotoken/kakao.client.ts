import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import querystring from 'node:querystring';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { KakaotokenDto } from './kakaotoken.dto';

@Injectable()
export class KakaoClient {
  constructor(private readonly httpService: HttpService) {}

  async requestKakaoToken(
    clientId: string | undefined,
    redirectUri: string | undefined,
    code: string,
    client_secret: string | undefined,
  ): Promise<KakaotokenDto> {
    const requestKakaoInfo = {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code: code,
      client_secret: client_secret,
    };
    const params = querystring.stringify(requestKakaoInfo);
    const config: AxiosRequestConfig = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };

    const requestUrl = `https://kauth.kakao.com/oauth/token?${params}`;

    const responseData = await lastValueFrom(
      this.httpService.post(requestUrl, null, config).pipe(
        map((response) => {
          return response;
        }),
      ),
    );

    return KakaotokenDto.of(
      responseData.data['access_token'],
      responseData.data['token_type'],
      responseData.data['refresh_token'],
      responseData.data['expires_in'],
      responseData.data['scope'],
      responseData.data['refresh_token_expires_in'],
    );
  }
}
