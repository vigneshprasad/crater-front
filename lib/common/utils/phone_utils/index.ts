import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import countries from "world-countries";

const PhoneUtils = () => {
  const countryCodes = getCountries();
  const countryData = countries.filter(
    (country) => countryCodes.indexOf(country.cca2 as CountryCode) > -1
  );

  const getCountryDialingCode = (country: CountryCode) =>
    getCountryCallingCode(country);

  return {
    countryData,
    countryCodes,
    getCountryDialingCode,
  };
};

export default PhoneUtils();
