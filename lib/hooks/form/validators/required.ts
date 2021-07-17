import { IFormFieldValidator } from "../types";

const isRequired: IFormFieldValidator = <T>(value: T) => {
  return !!value;
};

export default isRequired;
