"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExistsConstraint = exports.NotExists = void 0;
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../../prisma.service");
function NotExists(table, column, required = true, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [{ table: table, column: column, required: required }],
            validator: NotExistsConstraint,
        });
    };
}
exports.NotExists = NotExists;
let NotExistsConstraint = class NotExistsConstraint {
    async validate(value, args) {
        const [{ table, column, required }] = args.constraints;
        const prisma = new prisma_service_1.PrismaService();
        if (!value) {
            return !required;
        }
        const data = await prisma[table].findMany({
            where: {
                [column]: value,
            },
        });
        return data.length === 0;
    }
    defaultMessage(args) {
        const propertyName = args.property;
        const [{ table, column }] = args.constraints;
        return `${propertyName} value does exists on ${table} table`;
    }
};
NotExistsConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'NotExists', async: true })
], NotExistsConstraint);
exports.NotExistsConstraint = NotExistsConstraint;
//# sourceMappingURL=notExists.validator.decorator.js.map