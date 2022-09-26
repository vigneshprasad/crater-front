import { AnimatePresence, useAnimation } from "framer-motion";
import { CountryCode } from "libphonenumber-js";
import { useCallback, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import {
  Text,
  Grid,
  StyledInput,
  Box,
  Flex,
  Icon,
  InputProps,
  BoxProps,
} from "@/common/components/atoms";
import { PhoneLib } from "@/common/utils/phone_lib";

import CountriesList from "../CountriesList";

export type IPhoneInputProps = InputProps & {
  boxProps?: BoxProps;
  error?: string;
  defaultCountry?: CountryCode;
  initialValue?: string;
  onValueChanged?: (val: string) => void;
};

const StyledCodeInput = styled.input`
  min-width: 32px;
  max-width: 40px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.4rem;
  background: transparent;
  border: 1px solid transparent;
  outline: none;
  color: ${({ theme }) => theme.colors.white[0]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.xxxxs}px;
`;

const Container = styled(Grid)`
  cursor: pointer;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.textQuartenary};
  }
`;

const StyledContainer = styled(Flex)`
  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export function PhoneInput({
  error,
  initialValue,
  placeholder = "Enter Phone Number",
  onValueChanged,
  defaultCountry,
  boxProps,
  ...rest
}: IPhoneInputProps): JSX.Element {
  const countryCodeInputRef = useRef<HTMLInputElement>(null);
  const { space, colors, radii, zIndices, borders } = useTheme();
  const [inputValue, setInputValue] = useState(initialValue ?? "");
  const [countryCode, setCountryCode] = useState(defaultCountry ?? "IN");
  const animate = useAnimation();

  const { disabled } = rest;

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
    return `1px solid ${error ? colors.error : borders.input}`;
  }, [error, colors, borders]);

  const onChangeCountryCode = useCallback(
    (code: CountryCode): void => {
      countryCodeInputRef.current?.blur();
      setCountryCode(code);
    },
    [setCountryCode, countryCodeInputRef]
  );

  return (
    <Box>
      <Box
        position="relative"
        h={50}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
        {...boxProps}
      >
        <CountriesList
          animate={animate}
          active={countryCode}
          backgroundColor={colors.primaryBackground}
          onChange={onChangeCountryCode}
        />
        <Container
          position="absolute"
          border={border}
          top={0}
          right={0}
          left={0}
          borderRadius={radii.xxxxs}
          bg={disabled ? colors.secondaryDark : colors.primaryBackground}
          py={space.xxxxxs}
          px={space.xxxxs}
          zIndex={zIndices.dropdownContainer}
          gridTemplateColumns="min-content 1fr"
          gridGap={space.xxxs}
        >
          <StyledContainer
            py={6}
            pl={space.xxxxxs}
            pr={space.xxxs}
            flexDirection="row"
            alignItems="center"
            borderRadius={2}
            borderRight={`1px solid ${colors.primaryLight}`}
            tabIndex={1}
            onFocus={showDropdown}
            onBlur={hideDropdown}
          >
            <Text fontSize="2.8rem" textAlign="center">
              {countryData.flag}
            </Text>
            <StyledCodeInput
              ref={countryCodeInputRef}
              readOnly
              value={phoneExtension}
            />
            <Icon icon="ChevronDown" size={20} />
          </StyledContainer>
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
          <Text py={space.xxxxxs} color={colors.error} textStyle="error">
            {error}
          </Text>
        )}
      </AnimatePresence>
    </Box>
  );
}
