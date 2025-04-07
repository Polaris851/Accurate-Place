import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @Matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, { message: 'O telefone deve estar no formato válido'})
  phone: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, { message: 'CPF é inválido'})
  cpf: string;
}
