import { Test, TestingModule } from '@nestjs/testing';
import { NftImageService } from './nft-image.service';

describe('NftImageService', () => {
  let service: NftImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftImageService],
    }).compile();

    service = module.get<NftImageService>(NftImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
