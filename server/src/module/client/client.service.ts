import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Client } from './entities/client.entity';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly clientRepository: EntityRepository<Client>) {}

  async findAll() {
    return await this.clientRepository.findAll();
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({ id });
    if(!client)  throw new NotFoundException('Cliente não encontrado');
    return client;
  }

  async remove(id: number) {
    const client = await this.clientRepository.findOne({ id });
    if(!client)  throw new NotFoundException('Cliente não encontrado');

    await this.clientRepository.nativeDelete({ id });
    return `O cliente ${client.name} foi removido`;
  }
}
