"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CnpjValidConstraint = exports.CnpjValid = void 0;
const class_validator_1 = require("class-validator");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
function CnpjValid(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: CnpjValidConstraint,
        });
    };
}
exports.CnpjValid = CnpjValid;
let CnpjValidConstraint = class CnpjValidConstraint {
    validate(value) {
        return cpf_cnpj_validator_1.cnpj.isValid(value);
    }
    defaultMessage(args) {
        const propertyName = args.property;
        return `${propertyName} does not represent a CNPJ valid`;
    }
};
CnpjValidConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'CnpjValid' })
], CnpjValidConstraint);
exports.CnpjValidConstraint = CnpjValidConstraint;
//# sourceMappingURL=cnpj.validator.decorator.js.map