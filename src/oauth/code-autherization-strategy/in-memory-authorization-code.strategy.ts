// src/auth/strategies/in-memory-authorization-code.strategy.ts

import { AuthorizationCodeStrategy } from './authorization-code-strategy.interface';

export class InMemoryAuthorizationCodeStrategy
  implements AuthorizationCodeStrategy
{
  private codes: { [key: string]: any } = {};

  async saveCode(code: string, data: any, ttl: number): Promise<void> {
    this.codes[code] = { ...data, expiry: Date.now() + ttl * 1000 };
    setTimeout(() => this.deleteCode(code), ttl * 1000);
  }

  async getCode(code: string): Promise<any> {
    const entry = this.codes[code];
    if (entry && entry.expiry > Date.now()) {
      return entry;
    }
    return null;
  }

  async deleteCode(code: string): Promise<void> {
    delete this.codes[code];
  }
}
