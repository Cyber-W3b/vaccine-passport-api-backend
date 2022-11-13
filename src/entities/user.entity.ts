import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'Nome do usuário',
    required: true,
    type: 'string',
  })
  nome?: string;

  @ApiProperty({
    description: 'Email do usuário',
    required: true,
    type: 'string',
  })
  email?: string;

  @ApiProperty({
    description: 'Carteira do usuário',
    required: true,
    type: 'string',
  })
  wallet?: string;

  @ApiProperty({
    description: 'Número do cartão do SUS do usuário',
    required: false,
  })
  susCardNumber?: string;

  @ApiProperty({
    description: 'Número do COREN do usuário - se enfermeiro',
    required: false,
  })
  corenNumber?: string;

  @ApiProperty({
    description: 'Número do CRM do usuário - se médico',
    required: false,
  })
  crmNumber?: string;

  @ApiProperty({
    description: 'Flag que indica se o cadastro do usuário está completo',
    required: true,
  })
  completed: boolean;

  @ApiProperty({
    description: 'Data de cadastro do usuário',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do usuário',
  })
  updatedAt: Date;
}
