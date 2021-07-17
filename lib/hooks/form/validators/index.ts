import { IFormFieldValidator, ValidatorTypes } from "../types";
import isEmail from "./email";
import isRequired from "./required";

const Validators: Record<ValidatorTypes, IFormFieldValidator> = {
  required: isRequired,
  email: isEmail,
};

export default Validators;
