import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KakaoClient } from './kakao.client';
import { KakaotokenDto } from './kakaotoken.dto';

@Controller('auth')
export class KakaoController {
  constructor(
    private config: ConfigService,
    private client: KakaoClient,
  ) {}

  @Get('kakao')
  @Header('Content-Type', 'text/html')
  async kakaoLogin(@Res() res: any): Promise<void> {
    const clientId = this.config.get<string>('KAKAO_CLIENT_ID');
    const redirectUri = this.config.get<string>('KAKAO_REDIRECT_URI');
    const callbackUri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    res.redirect(callbackUri);
  }

  @Get('kakao/callback')
  @Header('Content-Type', 'text/html')
  async kakaoLoginCallback(
    @Query('code') code: string,
  ): Promise<KakaotokenDto> {
    const clientId = this.config.get<string>('KAKAO_CLIENT_ID');
    const redirectUri = this.config.get<string>('KAKAO_REDIRECT_URI');
    const clientSecret = this.config.get<string>('KAKAO_CLIENT_SECRET');

    const response = await this.client.requestKakaoToken(
      clientId,
      redirectUri,
      code,
      clientSecret,
    );

    return response;
  }
}
