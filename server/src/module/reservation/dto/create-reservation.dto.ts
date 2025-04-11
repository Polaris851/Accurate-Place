import { IsNumber, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateReservationDto {
  @IsNotEmpty({ message: 'O cliente é obrigatório.' })
  client_id: number;

  @IsNotEmpty({ message: 'A locação é obrigatório.' })
  host_id: number;

  @IsNotEmpty({ message: 'A data inicio é obrigatório.' })
  start_date: Date;

  @IsNotEmpty({ message: 'A data final é obrigatório.' })
  end_date: Date;

  @IsNotEmpty({ message: 'O valor final é obrigatório.' })
  @IsNumber({}, { message: 'O valor final deve ser numérico.' })
  @IsPositive({ message: 'O valor final deve ser positivo.' })
  total_price: number;

  @IsNotEmpty({ message: 'A situação é obrigatório.' })
  @IsString({ message: 'A situação deve ser uma string.' })
  status: string;
}
