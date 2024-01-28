import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/client.entity';

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  async validateClient(
    clientId: string,
    clientSecret: string,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { clientId, clientSecret },
    });
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
}
