import { IFormFieldValidator } from "../types";

const isEmail: IFormFieldValidator = <T>(value: T) => {
  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"x]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (typeof value === "string") {
    return emailRegExp.test(value.toString().toLowerCase());
  }
  return false;
};

export default isEmail;
