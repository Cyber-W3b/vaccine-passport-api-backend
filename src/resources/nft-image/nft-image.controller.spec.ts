import { Test, TestingModule } from '@nestjs/testing';
import { NftImageController } from './nft-image.controller';
import { NftImageService } from './nft-image.service';

describe('NftImageController', () => {
  let controller: NftImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftImageController],
      providers: [NftImageService],
    }).compile();

    controller = module.get<NftImageController>(NftImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
