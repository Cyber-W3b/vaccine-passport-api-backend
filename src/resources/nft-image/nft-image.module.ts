import { Module } from '@nestjs/common';
import { NftImageService } from './nft-image.service';
import { NftImageController } from './nft-image.controller';

@Module({
  controllers: [NftImageController],
  providers: [NftImageService]
})
export class NftImageModule {}
