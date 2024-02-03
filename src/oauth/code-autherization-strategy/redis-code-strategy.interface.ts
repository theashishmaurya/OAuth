import { AuthorizationCodeStrategy } from './authorization-code-strategy.interface';

class RedisStorage implements AuthorizationCodeStrategy {
  // Implementation would interact with Redis
  saveCode(code: string, data: any, ttl: number): Promise<void> {
    // Redis set code with data
    return Promise.resolve(); // Add return statement
  }

  getCode(code: string): any {
    // Redis get code data
    return null; // Placeholder
  }

  deleteCode(code: string): Promise<void> {
    // Redis remove code

    return Promise.resolve(); // Add return statement
  }
}
