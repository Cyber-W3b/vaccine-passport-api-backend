import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginStep2Dto {
  @ApiProperty({
    description: 'Token do usuário pego no e-mail',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  token: string;
}
