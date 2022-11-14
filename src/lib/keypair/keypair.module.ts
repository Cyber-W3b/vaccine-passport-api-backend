import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const keypair = require('keypair');

@Module({
  imports: [ConfigModule],
})
export class KeypairModule {
  private readonly logger = new Logger(KeypairModule.name);
  private static pairs = null;

  /**
   * Inicializa, gerando uma nova chave privada e pública ou lê a já existente
   */
  constructor() {
    try {
      const pairs = {};
      if (!fs.existsSync(process.env.JWT_KEY_FOLDER)) {
        fs.mkdirSync(process.env.JWT_KEY_FOLDER);
      }

      if (
        !fs.existsSync(process.env.JWT_KEY_FOLDER + '/private.key') &&
        !fs.existsSync(process.env.JWT_KEY_FOLDER + '/public.key')
      ) {
        this.logger.warn('Keys do not exist. Creating them.');
        const pair = keypair({
          bits: Number(process.env.API_CRIPTO_BITS_JWT) ?? 128,
        });
        fs.writeFileSync(
          process.env.JWT_KEY_FOLDER + '/public.key',
          pair.public,
        );
        fs.writeFileSync(
          process.env.JWT_KEY_FOLDER + '/private.key',
          pair.private,
        );
        this.logger.log('Keys created and being served to the app.');
      }
    } catch (e) {
      this.logger.error('Error loading or generating keys. Sorry.');
      console.error(e);
      process.exit(100);
    }

    this.logger.log('Keypair Module initialized');
  }

  /**
   * Lê e recupera a chave pública e a chave privada correspondente
   */
  static getKeyPair(): any {
    if (this.pairs) {
      return this.pairs;
    }

    const pub = fs.readFileSync(
      process.env.JWT_KEY_FOLDER + '/public.key',
      'utf8',
    );
    const pri = fs.readFileSync(
      process.env.JWT_KEY_FOLDER + '/private.key',
      'utf8',
    );

    this.pairs = {
      public: pub,
      private: pri,
    };

    return this.pairs;
  }
}
