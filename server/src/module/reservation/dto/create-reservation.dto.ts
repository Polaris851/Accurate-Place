import { IsNumber, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateReservationDto {
  @IsNotEmpty({ message: 'A locação é obrigatório.' })
  host_id: number;

  @IsNotEmpty({ message: 'A data inicio é obrigatório.' })
  start_date: Date;

  @IsNotEmpty({ message: 'A data final é obrigatório.' })
  end_date: Date;
}
