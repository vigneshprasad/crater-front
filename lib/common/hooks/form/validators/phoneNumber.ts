import validator from "validator";

import { IFormFieldValidator } from "../types";

const isPhoneNumber: IFormFieldValidator = <T>(value: T) => {
  if (typeof value === "string") {
    return validator.isMobilePhone(value);
  }
  return false;
};

export default isPhoneNumber;
