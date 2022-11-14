import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CpfValid } from '../../../lib/cpf.validator/cpf.validator.decorator';

export class LoginStep1Dto {
  @ApiProperty({
    description: 'CPF do usuário',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @CpfValid()
  cpf: string;
}
