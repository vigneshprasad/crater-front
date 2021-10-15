import { IFormFieldValidator, ValidatorTypes } from "../types";
import isEmail from "./email";
import minLength from "./minLength";
import isPhoneNumber from "./phoneNumber";
import isRequired from "./required";

const Validators: Record<ValidatorTypes, IFormFieldValidator> = {
  required: isRequired,
  email: isEmail,
  phoneNumber: isPhoneNumber,
  minLength: minLength,
};

export default Validators;
