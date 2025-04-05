import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Client } from './entities/client.entity';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly clientRepository: EntityRepository<Client>) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    await this.clientRepository.insert(client);
    return client;
  }

  async findAll() {
    return await this.clientRepository.findAll();
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({ id });
    if(!client) return 'Nenhum cliente foi encontrado';

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOne({ id });
    if(!client) return 'Nenhum cliente foi encontrado';

    return await this.clientRepository.nativeUpdate(client, updateClientDto);
  }

  async remove(id: string) {
    const client = await this.clientRepository.findOne({ id });
    if(!client) return 'Nenhum cliente foi encontrado';

    await this.clientRepository.nativeDelete({ id });
    return `O cliente ${client.name} foi removido`;
  }
}
