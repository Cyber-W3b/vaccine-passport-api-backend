import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, Length } from 'class-validator';

export class GenerateNftImageDto {
  @ApiProperty({
    description: 'Tipo da Vacina',
    required: true,
  })
  @IsNotEmpty()
  vaccineType: string;

  @ApiProperty({
    description: 'Dose da vacina- 1ª, 2ª, reforço...',
    required: true,
  })
  @IsNotEmpty()
  dosis: string;

  @ApiProperty({
    description: 'Lote da vacina',
    required: true,
  })
  @IsNotEmpty()
  batch: string;

  @ApiProperty({
    description: 'Unidade da vacina',
    required: true,
  })
  @IsNotEmpty()
  unity: string;

  @ApiProperty({
    description: 'Data de aplicação da vacina - Formato: YYYY-MM-DD',
    required: true,
  })
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  @Length(10, 10)
  dateApplication: string;
}
