import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { OauthModule } from './oauth/oauth.module';
import { Client } from './client/client.entity';
import { ClientController } from './client/client.controller';
import { ClientsService } from './client/client.service';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule,
    ClientModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.db', // Update with the path to your SQLite DB file
      entities: [User, Client],
      synchronize: true, // Note: set to false in production!
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
