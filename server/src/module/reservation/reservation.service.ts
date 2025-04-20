import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Reservation } from './entities/reservation.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { Host } from '../host/entities/host.entity';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private readonly reservationRepository: EntityRepository<Reservation>,
    @InjectRepository(Host) private readonly hostRepository: EntityRepository<Host>,
    @InjectRepository(Client) private readonly clientRepository: EntityRepository<Client>
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const host = await this.hostRepository.findOne({ id: createReservationDto.host_id });
    if (!host) {
      throw new NotFoundException('Locação não encontrada');
    }
    
    const client = await this.clientRepository.findOne({ id: createReservationDto.client_id });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    if (createReservationDto.start_date > createReservationDto.end_date) {
      throw new BadRequestException('A data inicial deve ser anterior à data final');
    }
    
    const conflict = await this.reservationRepository.findOne({
      host,
      start_date: { $lt: createReservationDto.end_date },
      end_date: { $gt: createReservationDto.start_date }
    });
    
    if (conflict) {
      throw new ConflictException('Locação já reservada nesse período');
    }
    
    const clientConflict = await this.reservationRepository.findOne({
      client,
      start_date: { $lt: createReservationDto.end_date },
      end_date: { $gt: createReservationDto.start_date }
    });
    
    if (clientConflict) {
      throw new ConflictException('Cliente já possui uma reserva nesse período');
    }

    const startDate = new Date(createReservationDto.start_date);
    const endDate = new Date(createReservationDto.end_date);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const total = host.hourly_price * 24 * days;

    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      total_price: total, 
    });
    
    await this.reservationRepository.insert(reservation);
    return reservation;
  }

  async findAll() {
    return await this.reservationRepository.findAll({
      populate: ["client", "host"]
    });
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({ id }, {
      populate: ["client", "host"]
    });

    if(!reservation) throw new NotFoundException('Nenhuma reserva foi encontrada');
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOne({ id });
    if(!reservation) throw new NotFoundException('Nenhuma reserva foi encontrada');

    if (updateReservationDto.start_date || updateReservationDto.end_date || updateReservationDto.host_id) {
      const updatedStart = new Date(updateReservationDto.start_date ?? reservation.start_date);
      const updatedEnd = new Date(updateReservationDto.end_date ?? reservation.end_date);
      const updatedHostId = updateReservationDto.host_id ?? reservation.host_id;
    
      const conflict = await this.reservationRepository.findOne({
        id: { $ne: reservation.id },
        host: updatedHostId,
        start_date: { $lt: updatedEnd },
        end_date: { $gt: updatedStart }
      });
    
      if (conflict) {
        throw new ConflictException('Conflito de reserva com outro período');
      }
    }
    
    return await this.reservationRepository.nativeUpdate(reservation, updateReservationDto);
  }

  async remove(id: number) {
    const reservation = await this.reservationRepository.findOne({ id });
    if(!reservation) throw new NotFoundException('Nenhuma reserva foi encontrada');

    await this.reservationRepository.nativeDelete({ id });
    return `A reserva foi removida`;
  }
}
