// src/oauth/dto/create-client.dto.ts
export class CreateClientDto {
  name: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  grantTypes: string[];
  scope: string;
  isActive: boolean;
}

export class UpdateClientDto {
  name?: string;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  grantTypes?: string[];
  scope?: string;
  isActive?: boolean;
}
