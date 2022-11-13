import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CpfValid } from '../../../lib/cpf.validator/cpf.validator.decorator';

export class SignupStep2Dto {
  @ApiProperty({
    description: 'Carteira do usuário',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  wallet: string;

  @ApiProperty({
    description: 'Número do cartão do SUS do usuário',
    required: true,
  })
  @IsNotEmpty()
  susCardNumber: string;

  @ApiProperty({
    description: 'Número do COREN do usuário - se enfermeiro',
    required: false,
  })
  corenNumber?: string;

  @ApiProperty({
    description: 'Número do CPF do usuário',
    required: true,
  })
  @IsNotEmpty()
  @CpfValid()
  cpf: string;

  @ApiProperty({
    description: 'Número do CRM do usuário - se médico',
    required: false,
  })
  crmNumber?: string;
}
