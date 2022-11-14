import { NftImageService } from './nft-image.service';
import { GenerateNftImageDto } from './dto/generate-nft-image.dto';
export declare class NftImageController {
    private readonly nftImageService;
    constructor(nftImageService: NftImageService);
    generateNftImage(dto: GenerateNftImageDto, req: any, res: any): Promise<any>;
}
