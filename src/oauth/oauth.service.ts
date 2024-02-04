import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/client.entity';
import { randomBytes } from 'crypto';
import { InMemoryAuthorizationCodeStrategy } from './code-autherization-strategy/in-memory-authorization-code.strategy';
import { AuthorizationCodeStrategy } from './code-autherization-strategy/authorization-code-strategy.interface';

@Injectable()
export class OAuthService {
  private codeStrategy: AuthorizationCodeStrategy;

  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {
    // Initially use the in-memory strategy
    this.codeStrategy = new InMemoryAuthorizationCodeStrategy();
  }

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
    await this.codeStrategy.saveCode(
      code,
      {
        client_id,
        user_email,
        redirect_uri,
        scope,
      },
      600000,
    ); // Add the missing ttl argument

    return code;
  }
}
