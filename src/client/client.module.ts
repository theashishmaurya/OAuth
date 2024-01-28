import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientsService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientsService],
})
export class ClientModule {}
