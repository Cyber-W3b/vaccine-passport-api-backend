import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { GenerateNftImageDto } from './dto/generate-nft-image.dto';

@Injectable()
export class NftImageService {
  async generateNftImage(dto: GenerateNftImageDto, data: User) {
    return Promise.resolve(undefined);
  }
}
