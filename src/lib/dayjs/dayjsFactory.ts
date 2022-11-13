import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export class DayjsFactory {
  private timezone;

  constructor(timezone = process.env.TZ ?? 'America/Sao_Paulo') {
    this.timezone = timezone;
  }

  /**
   * Seta o timezone default do factory
   * @param timezone
   */
  setDefaultTimezone(timezone: string) {
    this.timezone = timezone;
  }

  /**
   * Cria um nova instância de timezone
   * @param time Data e hora de acordo com os padrões do Dayjs
   * @param timezone Timezone a ser sobrescrito
   */
  create(
    time: string | Date | undefined = undefined,
    timezone: string | null = null,
  ): dayjs.Dayjs {
    return dayjs(time).tz(timezone ?? this.timezone);
  }

  /**
   * Cria um nova instância com timezone UTC
   * @param time Data e hora de acordo com os padrões do Dayjs
   */
  createUtc(time: string | Date | undefined = undefined): dayjs.Dayjs {
    return dayjs(time).utc();
  }
}
