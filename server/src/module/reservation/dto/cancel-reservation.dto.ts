import { IsNotEmpty, IsNumber } from "class-validator";

export class CancelReservationDto {
    @IsNotEmpty()
    reservationId: number;
}