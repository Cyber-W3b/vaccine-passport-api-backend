/// <reference types="node" />
import { User } from '../../entities/user.entity';
import { GenerateNftImageDto } from './dto/generate-nft-image.dto';
export declare class NftImageService {
    generateNftImage(dto: GenerateNftImageDto, data: User): Promise<string | Buffer | (string | Buffer)[]>;
}
