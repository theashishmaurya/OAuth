import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { OAuthModule } from './oauth/oauth.module';
import { Client } from './client/client.entity';
import { ClientModule } from './client/client.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule,
    ClientModule,
    OAuthModule,
    // ServeStaticModule.forRoot({
    //     rootPath: join(__dirname, '..', 'client'),
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.db', // Update with the path to your SQLite DB file
      entities: [User, Client],
      synchronize: true, // Note: set to false in production!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
