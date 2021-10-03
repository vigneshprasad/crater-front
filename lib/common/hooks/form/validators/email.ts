import validator from "validator";

import { IFormFieldValidator } from "../types";

const isEmail: IFormFieldValidator = <T>(value: T) => {
  if (typeof value === "string") {
    return validator.isEmail(value);
  }
  return false;
};

export default isEmail;
