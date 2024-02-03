import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/client.entity';
import { randomBytes } from 'crypto';

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

  async generateAuthorizationCode(client_id, user_email, redirect_uri, scope) {
    const code = randomBytes(16).toString('hex'); // Generates a 32-character hexadecimal string

    // TODO: Save the authorization code to the in-memory store

    return code;
  }
}
