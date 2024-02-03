export interface AuthorizationCodeStrategy {
  saveCode(code: string, data: any, ttl: number): Promise<void>;
  getCode(code: string): Promise<any>;
  deleteCode(code: string): Promise<void>;
}
