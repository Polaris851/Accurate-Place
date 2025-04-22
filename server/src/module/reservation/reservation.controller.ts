import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Req, Query, ForbiddenException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { IsLogged } from 'src/auth/decorators/is-logged';
import { Request } from 'src/auth/guards/auth.guard';
import { IsAdmin } from 'src/auth/decorators/is-admin';
import { CancelReservationDto } from './dto/cancel-reservation.dto';

@Controller('reservation')
@IsLogged()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @Req() request: Request) {
    return await this.reservationService.create(createReservationDto, request.user.id);
  }

  @Get()
  @IsAdmin()
  async findAll(@Query("hostId") hostId?: string) {
    if (hostId !== undefined) {
      return await this.reservationService.findByHostId(+hostId);
    }

    return await this.reservationService.findAll();
  }

  @Get("/my-reservations")
  public async myReservations(@Req() request: Request) {
    const user = request.user;

    const reservations = await this.reservationService.findByUser(user);

    return reservations;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.findOne(id);
  }

  @Put("/cancel")
  public async cancelReservation(@Body() cancelReservationDto: CancelReservationDto, @Req() request: Request) {
    const reservation = await this.reservationService.findOne(cancelReservationDto.reservationId);
    const currentUser = request.user;

    if (currentUser.id !== reservation.client_id && !currentUser.is_admin) {
      throw new ForbiddenException("Você não tem permissão para cancelar essa reserva");
    }

    await this.reservationService.cancelReservation(reservation);

    return { success: true };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.remove(id);
  }
}
