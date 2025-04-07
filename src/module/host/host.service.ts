import { Injectable } from '@nestjs/common';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Host } from './entities/host.entity';

@Injectable()
export class HostService {
  constructor(@InjectRepository(Host) private readonly hostRepository: EntityRepository<Host>) {}

  async create(createHostDto: CreateHostDto) {
    const host = this.hostRepository.create(createHostDto);
    await this.hostRepository.insert(host);
    return host;
  }

  async findAll() {
    return await this.hostRepository.findAll();
  }

  async findOne(id: number) {
    const host = await this.hostRepository.findOne({ id });
    if(!host) return 'Nenhuma locação foi encontrada';
    return host;
  }

  async update(id: number, updateHostDto: UpdateHostDto) {
    const host = await this.hostRepository.findOne({ id });
    if(!host) return 'Nenhuma locação foi encontrada';
    
    return await this.hostRepository.nativeUpdate(host, updateHostDto);
  }

  async remove(id: number) {
    const host = await this.hostRepository.findOne({ id });
    if(!host) return 'Nenhuma locação foi encontrada';

    await this.hostRepository.nativeDelete({ id });
    return `A locação ${host.name} foi removido`;
  }
}
