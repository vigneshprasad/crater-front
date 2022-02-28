import { AnimatePresence, useAnimation } from "framer-motion";
import { CountryCode } from "libphonenumber-js";
import { useCallback, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import {
  Text,
  InputProps,
  Grid,
  StyledInput,
  Box,
} from "@/common/components/atoms";
import { PhoneLib } from "@/common/utils/phone_lib";

import CountriesList from "./CountriesList";

export type IPhoneInputProps = InputProps & {
  error?: string;
  defaultCountry?: CountryCode;
  initialValue?: string;
  onValueChanged?: (val: string) => void;
};

const StyledCodeInput = styled.input`
  min-width: 32px;
  max-width: 42px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem;
  background: transparent;
  border: 2px solid transparent;
  margin-left: 8px;
  outline: none;
  color: ${({ theme }) => theme.colors.white[0]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.xxs}px;

  &:hover {
    background: ${({ theme }) => theme.colors.black[3]};
  }
`;

const Container = styled(Grid)`
  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

export function PhoneInput({
  error,
  initialValue,
  placeholder = "Enter Phone Number",
  onValueChanged,
  defaultCountry,
  ...rest
}: IPhoneInputProps): JSX.Element {
  const countryCodeInputRef = useRef<HTMLInputElement>(null);
  const { space, colors, radii, zIndices } = useTheme();
  const [inputValue, setInputValue] = useState(initialValue ?? "");
  const [countryCode, setCountryCode] = useState(defaultCountry ?? "IN");
  const animate = useAnimation();

  const countryData = useMemo(() => {
    return new PhoneLib().getCountryByCode(countryCode);
  }, [countryCode]);

  const phoneExtension = useMemo(() => {
    if (countryData.idd.suffixes.length > 1) {
      return countryData.idd.root;
    }
    return `${countryData.idd.root}${countryData.idd.suffixes?.[0]}`;
  }, [countryData]);

  const handleValueChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      const exp = RegExp(/^[0-9]*$/);
      const valid = exp.test(newValue);
      if (valid) {
        setInputValue(newValue);
        if (onValueChanged) {
          onValueChanged(phoneExtension + newValue);
        }
      }
    },
    [onValueChanged, setInputValue, phoneExtension]
  );

  const showDropdown = async (): Promise<void> => {
    await animate.start("visible");
  };

  const hideDropdown = async (): Promise<void> => {
    await animate.start("hidden");
  };

  const border = useMemo(() => {
    return `2px solid ${error ? colors.error : "transparent"}`;
  }, [error, colors]);

  const onChangeCountryCode = useCallback(
    (code: CountryCode): void => {
      countryCodeInputRef.current?.blur();
      setCountryCode(code);
    },
    [setCountryCode, countryCodeInputRef]
  );

  return (
    <Box>
      <Box position="relative" h={50}>
        <CountriesList
          animate={animate}
          active={countryCode}
          onChange={onChangeCountryCode}
        />
        <Container
          position="absolute"
          border={border}
          top={0}
          right={0}
          left={0}
          borderRadius={radii.xxs}
          bg={colors.black[1]}
          p={space.xxxxs}
          zIndex={zIndices.dropdownContainer}
          gridTemplateColumns="min-content 1fr"
          gridGap={space.xxxs}
        >
          <StyledCodeInput
            ref={countryCodeInputRef}
            readOnly
            value={phoneExtension}
            onFocus={showDropdown}
            onBlur={hideDropdown}
          />
          <StyledInput
            placeholder={placeholder}
            type="tel"
            onChange={handleValueChange}
            value={inputValue}
            {...rest}
          />
        </Container>
      </Box>
      <AnimatePresence>
        {error && (
          <Text
            mt={space.xxs}
            mx={space.xxs}
            color={colors.error}
            textStyle="error"
          >
            {error}
          </Text>
        )}
      </AnimatePresence>
    </Box>
  );
}
