// src/clients/clients.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto, UpdateClientDto } from './client.dto';
@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async getAllClients(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async getClientById(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) {
      throw new Error('Client not found');
    }
    client.grantTypes = JSON.parse(client.grantTypes);
    return client;
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const client = {
      ...createClientDto,
      grantTypes: JSON.stringify(createClientDto.grantTypes),
    };
    const res = this.clientsRepository.create(client);
    return this.clientsRepository.save(res);
  }

  async updateClient(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    await this.clientsRepository.update(id, {
      ...updateClientDto,
      grantTypes: JSON.stringify(updateClientDto.grantTypes),
    });
    return this.clientsRepository.findOne({ where: { id } });
  }

  async deleteClient(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
