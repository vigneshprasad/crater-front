import {
  CountryCallingCode,
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import countries, { Country } from "world-countries";

interface IPhoneUtils {
  countryData: Country[];
  countryCodes: CountryCode[];
  getCountryDialingCode: (country: CountryCode) => CountryCallingCode;
}

function PhoneUtils(): IPhoneUtils {
  const countryCodes = getCountries();
  const countryData = countries.filter(
    (country) => countryCodes.indexOf(country.cca2 as CountryCode) > -1
  );

  const getCountryDialingCode = (country: CountryCode): CountryCallingCode =>
    getCountryCallingCode(country);

  return {
    countryData,
    countryCodes,
    getCountryDialingCode,
  };
}

export default PhoneUtils();
