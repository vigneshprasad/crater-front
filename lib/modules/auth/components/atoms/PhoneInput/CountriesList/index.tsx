import phone_utils from "lib/common/utils/phone_utils";
import { CountryCode } from "libphonenumber-js";

import { createRef, useEffect, useMemo } from "react";

import { DropdownItem, DropdownListWrapper, Flag } from "../styles";

interface IProps {
  activeCountry: CountryCode;
  onItemPressed: (country: CountryCode) => void;
}

const CountriesList: React.FC<IProps> = ({ activeCountry, onItemPressed }) => {
  const countries = phone_utils.countryData;

  const elRefs = useMemo(
    () => countries.map(() => createRef<HTMLDivElement>()),
    [countries]
  );

  // Scroll to selected item
  useEffect(() => {
    const selectedIndex = countries.findIndex(
      (item) => item.cca2 === activeCountry
    );

    if (selectedIndex > -1) {
      const ref = elRefs[selectedIndex]?.current;

      if (ref) {
        ref.scrollIntoView({
          block: "center",
        });
      }
    }
  }, [elRefs, activeCountry, countries]);

  return (
    <DropdownListWrapper
      onMouseDown={(e) => e.preventDefault()}
      initial={{
        position: "absolute",
        opacity: 1,
        transform: "translateY(calc(90% - 32px))",
      }}
      animate={{
        opacity: 1,
        transform: "translateY(calc(100% - 32px))",
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    >
      {countries.map((country, index) => {
        const callingCode = phone_utils.getCountryDialingCode(
          country.cca2 as CountryCode
        );
        return (
          <DropdownItem
            ref={elRefs[index]}
            selected={country.cca2 === activeCountry}
            key={country.cca3}
            onClick={() => onItemPressed(country.cca2 as CountryCode)}
          >
            <Flag>{country.flag}</Flag>
            <p>{`${country.name.common}(+${callingCode})`}</p>
          </DropdownItem>
        );
      })}
    </DropdownListWrapper>
  );
};

export default CountriesList;
