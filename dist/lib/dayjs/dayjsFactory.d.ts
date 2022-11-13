import * as dayjs from 'dayjs';
export declare class DayjsFactory {
    private timezone;
    constructor(timezone?: string);
    setDefaultTimezone(timezone: string): void;
    create(time?: string | Date | undefined, timezone?: string | null): dayjs.Dayjs;
    createUtc(time?: string | Date | undefined): dayjs.Dayjs;
}
