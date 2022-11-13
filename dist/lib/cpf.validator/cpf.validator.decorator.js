"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpfValidConstraint = exports.CpfValid = void 0;
const class_validator_1 = require("class-validator");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
function CpfValid(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: CpfValidConstraint,
        });
    };
}
exports.CpfValid = CpfValid;
let CpfValidConstraint = class CpfValidConstraint {
    validate(value) {
        return cpf_cnpj_validator_1.cpf.isValid(value);
    }
    defaultMessage(args) {
        const propertyName = args.property;
        return `${propertyName} does not represent a CPF valid`;
    }
};
CpfValidConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'CpfValid' })
], CpfValidConstraint);
exports.CpfValidConstraint = CpfValidConstraint;
//# sourceMappingURL=cpf.validator.decorator.js.map