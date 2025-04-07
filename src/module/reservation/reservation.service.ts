import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Reservation } from './entities/reservation.entity';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private readonly reservationRepository: EntityRepository<Reservation>) {}

  async create(createReservationDto: CreateReservationDto) {
    const reservation = this.reservationRepository.create(createReservationDto);
    await this.reservationRepository.insert(reservation);
    return reservation;
  }

  async findAll() {
    return await this.reservationRepository.findAll();
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({ id }, {
      populate: ["client", "host"]
    });
    if(!reservation) return 'Nenhuma reserva foi encontrada';
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOne({ id });
    if(!reservation) return 'Nenhuma reserva foi encontrada';

    return await this.reservationRepository.nativeUpdate(reservation, updateReservationDto);
  }

  async remove(id: number) {
    const reservation = await this.reservationRepository.findOne({ id });
    if(!reservation) return 'Nenhuma reserva foi encontrada';

    await this.reservationRepository.nativeDelete({ id });
    return `A reserva foi removida`;
  }
}
