import { IFormFieldValidator, ValidatorTypes } from "../types";
import isEmail from "./email";
import isPhoneNumber from "./phoneNumber";
import isRequired from "./required";

const Validators: Record<ValidatorTypes, IFormFieldValidator> = {
  required: isRequired,
  email: isEmail,
  phoneNumber: isPhoneNumber,
};

export default Validators;
