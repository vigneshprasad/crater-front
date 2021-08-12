import { CountryCode } from "libphonenumber-js";
import { createRef, useMemo } from "react";
import styled from "styled-components";

import phone_utils from "@/common/utils/phone_utils";

import { AnimatedBox, Grid, Text } from "../../atoms";

const ItemWrapper = styled(Grid)`
  transition: all 200ms ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export type ICountriesListProps = {
  activeCountry: CountryCode;
  onItemPressed: (country: CountryCode) => void;
};

export const CountriesList: React.FC<ICountriesListProps> = () => {
  const countries = phone_utils.countryData;

  const elRefs = useMemo(
    () => countries.map(() => createRef<HTMLDivElement>()),
    [countries]
  );

  return (
    <AnimatedBox
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
      position="absolute"
      bottom={0}
      right={0}
      left={0}
      overflow="scroll"
      maxHeight={["30vh"]}
    >
      {countries.map((country, index) => {
        const callingCode = phone_utils.getCountryDialingCode(
          country.cca2 as CountryCode
        );
        return (
          <ItemWrapper
            bg="#000"
            borderBottom="1px solid white"
            py={12}
            gridTemplateColumns={["48px 1fr"]}
            ref={elRefs[index]}
            key={country.cca3}
          >
            <Text textAlign="center">{country.flag}</Text>
            <Text>{`${country.name.common}(+${callingCode})`}</Text>
          </ItemWrapper>
        );
      })}
    </AnimatedBox>
  );
};
