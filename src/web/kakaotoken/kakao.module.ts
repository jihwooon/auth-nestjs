import { Module } from '@nestjs/common';
import { KakaoController } from './kakao.controller';
import { KakaoClient } from './kakao.client';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [KakaoController],
  providers: [KakaoClient],
  exports: [KakaoClient],
})
export class KakaoModule {}
