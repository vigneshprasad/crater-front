import parsePhoneNumber, {
  CountryCode,
  getCountries,
  PhoneNumber,
} from "libphonenumber-js";
import countries, { Country } from "world-countries";

export class PhoneLib {
  private _countryCodes: CountryCode[];
  private _countries: Country[];

  constructor() {
    this._countryCodes = getCountries();
    this._countries = countries.filter(
      (country) => this._countryCodes.indexOf(country.cca2 as CountryCode) > -1
    );
  }

  public get countries(): Country[] {
    return this._countries;
  }

  public getCountryByCode(code: CountryCode): Country {
    return this._countries.filter((country) => country.cca2 === code)?.[0];
  }

  public parse(
    text: string,
    defaultCountry?:
      | CountryCode
      | {
          defaultCountry?: CountryCode;
          defaultCallingCode?: string;
          extract?: boolean;
        }
  ): PhoneNumber | undefined {
    return parsePhoneNumber(text, defaultCountry);
  }
}
