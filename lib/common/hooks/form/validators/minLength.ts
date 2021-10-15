import { IFormFieldValidator } from "../types";

const checkMinLength: IFormFieldValidator = <T>(value: T) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return false;
};

export default checkMinLength;
