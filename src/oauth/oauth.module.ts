import { Module } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { OAuthController } from './oauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Client])],
  providers: [OAuthService],
  controllers:[OAuthController]
})
export class OAuthModule {}
