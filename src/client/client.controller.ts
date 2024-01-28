// src/clients/clients.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientsService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './client.dto';

@Controller('/clients')
export class ClientController {
  constructor(private clientsService: ClientsService) {}

  @Get('/')
  getAllClients() {
    return this.clientsService.getAllClients();
  }

  @Get('/:id')
  getClientById(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.getClientById(id);
  }

  @Post('/')
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  @Put('/:id')
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.updateClient(id, updateClientDto);
  }

  @Delete('/:id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.deleteClient(id);
  }
}
