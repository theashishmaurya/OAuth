import { Module } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { OAuthController } from './oauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Client,User])],
  providers: [OAuthService,AuthService,JwtService,UsersService],
  controllers:[OAuthController]
})
export class OAuthModule {}
