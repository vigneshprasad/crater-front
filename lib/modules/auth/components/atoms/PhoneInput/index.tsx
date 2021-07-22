import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import phone_utils from "lib/common/utils/phone_utils";
import { CountryCode } from "libphonenumber-js";

import { useState, ChangeEventHandler, useRef, useCallback } from "react";

import CountriesList from "./CountriesList";
import {
  PhoneInputWrapper,
  StyledInput,
  Error,
  RootContainer,
  Divider,
} from "./styles";

interface IProps {
  defaultCountry?: CountryCode;
  autoFocus?: boolean;
  intitalValue?: string;
  placeholder: string;
  error?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const PhoneInput: React.FC<IProps> = ({
  defaultCountry = "IN",
  placeholder,
  intitalValue,
  onChange,
  value,
  error,
  autoFocus,
}) => {
  const [activeCountry, setCountry] = useState(defaultCountry);
  const [phoneInputValue, setPhoneInputValue] = useState(intitalValue ?? "");
  const [showSheet, setShowSheet] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    const exp = RegExp(/^[0-9]*$/);
    const valid = exp.test(newValue);
    if (valid === true) {
      setPhoneInputValue(newValue);
      if (onChange) {
        const fullphone = `+${phone_utils.getCountryDialingCode(
          activeCountry
        )}${newValue}`;
        onChange(fullphone);
      }
    }
  };

  const onFocusHandler = () => {
    setShowSheet(true);
  };

  const handleOnBlur = () => {
    setShowSheet(false);
  };

  const handleCountryClick = useCallback(
    (country: CountryCode) => {
      setCountry(country);
      if (phoneInputRef) phoneInputRef.current?.focus();
    },
    [phoneInputRef]
  );

  const onChangeCountryInput = () => {};
  const activePhoneCode = phone_utils.getCountryDialingCode(activeCountry);

  return (
    <AnimateSharedLayout>
      <RootContainer layout>
        <PhoneInputWrapper layout error={error}>
          <StyledInput
            value={`+${activePhoneCode}`}
            onBlur={handleOnBlur}
            onFocus={onFocusHandler}
            onChange={onChangeCountryInput}
          />
          <Divider />
          <StyledInput
            ref={phoneInputRef}
            autoFocus={autoFocus}
            placeholder={placeholder}
            type="tel"
            value={value || phoneInputValue}
            maxLength={12}
            onChange={onChangeValue}
          />
          <AnimatePresence>
            {showSheet && (
              <CountriesList
                onItemPressed={handleCountryClick}
                activeCountry={activeCountry}
              />
            )}
          </AnimatePresence>
        </PhoneInputWrapper>
        <AnimatePresence>{error && <Error>{error}</Error>}</AnimatePresence>
      </RootContainer>
    </AnimateSharedLayout>
  );
};

export default PhoneInput;
