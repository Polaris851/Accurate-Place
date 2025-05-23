import { BadRequestException, ConflictException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
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
  ) { }

  async create(createReservationDto: CreateReservationDto, userId) {
    const host = await this.hostRepository.findOne({ id: createReservationDto.host_id });
    if (!host) {
      throw new NotFoundException('Locação não encontrada');
    }

    const client = await this.clientRepository.findOne({ id: userId });
    if (!client) {
      throw new NotFoundException("Usuário não encontrado");
    }

    if (createReservationDto.start_date > createReservationDto.end_date) {
      throw new BadRequestException('A data inicial deve ser anterior à data final');
    }

    const conflict = await this.reservationRepository.findOne({
      host,
      status: "active",
      start_date: { $lt: createReservationDto.end_date },
      end_date: { $gt: createReservationDto.start_date }
    });

    if (conflict) {
      throw new ConflictException('Locação já reservada nesse período');
    }

    const clientConflict = await this.reservationRepository.findOne({
      client,
      status: "active",
      start_date: { $lt: createReservationDto.end_date },
      end_date: { $gt: createReservationDto.start_date }
    });

    if (clientConflict) {
      throw new ConflictException('Cliente já possui uma reserva nesse período');
    }

    const startDate = new Date(createReservationDto.start_date);
    const endDate = new Date(createReservationDto.end_date);

    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    if (startDate.getTime() < today.getTime()) {
      throw new BadRequestException("Não é possível criar uma reserva em uma data passada")
    }

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (days > host.max_time) {
      throw new BadRequestException(`Tempo de reserva maior do que o permitido de ${host.max_time} dias`);
    }

    if (days < host.min_time) {
      throw new BadRequestException(`Tempo de reserva menor do que o mínimo de ${host.min_time} dias`);
    }

    const total = host.hourly_price * 24 * days;

    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      client_id: client.id,
      total_price: total,
      status: "active"
    });

    await this.reservationRepository.insert(reservation);
    return reservation;
  }

  public async findByUser(user: Client) {
    const reservations = await this.reservationRepository.findAll({
      where: {
        client_id: user.id
      },
      populate: ["client", "host"]
    });

    return reservations;
  }

  async findAll() {
    return await this.reservationRepository.findAll({
      populate: ["client", "host"]
    });
  }

  public async findByHostId(hostId: number) {
    return await this.reservationRepository.findAll({
      where: {
        host_id: hostId
      },
      populate: ["client", "host"]
    });
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({ id }, {
      populate: ["client", "host"]
    });

    if (!reservation) throw new NotFoundException('Nenhuma reserva foi encontrada');
    return reservation;
  }

  public async cancelReservation(reservation: Reservation) {
    await this.reservationRepository.nativeUpdate({ id: reservation.id }, { status: "canceled" });
  }

  async remove(id: number) {
    const reservation = await this.reservationRepository.findOne({ id });
    if (!reservation) throw new NotFoundException('Nenhuma reserva foi encontrada');

    await this.reservationRepository.nativeDelete({ id });
    return "A reserva foi removida";
  }
}
