"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsFactory = void 0;
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
class DayjsFactory {
    constructor(timezone) {
        var _a;
        if (timezone === void 0) { timezone = (_a = process.env.TZ) !== null && _a !== void 0 ? _a : 'America/Sao_Paulo'; }
        this.timezone = timezone;
    }
    setDefaultTimezone(timezone) {
        this.timezone = timezone;
    }
    create(time = undefined, timezone = null) {
        return dayjs(time).tz(timezone !== null && timezone !== void 0 ? timezone : this.timezone);
    }
    createUtc(time = undefined) {
        return dayjs(time).utc();
    }
}
exports.DayjsFactory = DayjsFactory;
//# sourceMappingURL=dayjsFactory.js.map