import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Host } from './entities/host.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { HostWithOccupiedDatesDto } from './dto/hosts-with-occupied-dates.dto';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Host) private readonly hostRepository: EntityRepository<Host>,
    @InjectRepository(Reservation) private readonly reservationRepository: EntityRepository<Reservation>
  ) { }

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
    if (!host) throw new NotFoundException('Locação não encontrada');

    const reservations = await this.reservationRepository.find({
      host: { id: id }
    });

    const occupiedDates: Date[] = [];

    for (const reservation of reservations) {
      if (reservation.status !== "active") {
        continue;
      }
      
      const start = this.normalizeDate(new Date(reservation.start_date));
      const end = this.normalizeDate(new Date(reservation.end_date));

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        occupiedDates.push(new Date(date));
      }
    }

    return {
      ...host,
      occupied_dates: Array.from(occupiedDates).sort()
    } as HostWithOccupiedDatesDto;
  }

  async update(id: number, updateHostDto: UpdateHostDto) {
    const host = await this.hostRepository.findOne({ id });
    if (!host) throw new NotFoundException('Locação não encontrada');

    return await this.hostRepository.nativeUpdate(host, updateHostDto);
  }

  async remove(id: number) {
    const host = await this.hostRepository.findOne({ id });
    if (!host) throw new NotFoundException('Locação não encontrada');

    await this.hostRepository.nativeDelete({ id });
    return "A locação foi removida";
  }

  async getAvailableHosts(start_date: string, end_date: string) {
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (start >= end) {
      throw new BadRequestException('A data inicial deve ser anterior à data final');
    }

    const hostsBusy = await this.reservationRepository.find({
      status: "active",
      start_date: { $lte: end },
      end_date: { $gte: start }
    })

    const hostsBusyIds = hostsBusy.map(h => h.host_id);

    if (hostsBusyIds.length === 0) {
      return this.hostRepository.findAll();
    }

    return this.hostRepository.find({
      id: { $nin: hostsBusyIds }
    });
  }

  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
