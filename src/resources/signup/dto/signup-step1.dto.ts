import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupStep1Dto {
  @ApiProperty({
    description: 'Nome do usuário',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  wallet: string;
}
