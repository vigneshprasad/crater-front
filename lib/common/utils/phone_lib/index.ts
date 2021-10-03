import { getCountries, getCountryCallingCode } from "libphonenumber-js";

export default function PhoneLib() {
  const _countryCodes = getCountries();

  const countries = _countryCodes.reduce(
    (code) => getCountryCallingCode(code),
    []
  );

  console.log(countries);

  return {
    countries,
  };
}
