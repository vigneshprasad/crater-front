import { useState, SyntheticEvent } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import AuthApiClient from "@/auth/api";
import { Login } from "@/auth/utils";
import { Form, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { OtpInput } from "@/common/components/objects/OtpInput";
import { PhoneInput } from "@/common/components/objects/PhoneInput";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";

type AuthFormArgs = {
  phoneNumber: string;
  otp: string;
};

export default function AuthForm(): JSX.Element {
  const router = useRouter();
  const { fields, fieldValueSetter, validateField, getValidatedData } =
    useForm<AuthFormArgs>({
      fields: {
        phoneNumber: {
          intialValue: "",
          validators: [
            {
              validator: Validators.phoneNumber,
              message: "Please enter valid number",
            },
          ],
        },
        otp: {
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "Please enter OTP",
            },
          ],
        },
      },
    });
  const [otpVisible, setOtpVisible] = useState(false);
  const { space } = useTheme();

  const getPhoneOtp = async (phoneNumber: string): Promise<void> => {
    try {
      await AuthApiClient.getPhoneOtp(phoneNumber);
      setOtpVisible(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const performLogin = async (
    phoneNumber: string,
    otp: string
  ): Promise<void> => {
    try {
      await Login("phone-auth", { phoneNumber, otp });
      router.reload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handlePhoneNumberSubmit = (): void => {
    const valid = validateField("phoneNumber");

    if (valid) {
      const value = `+91${fields.phoneNumber.value}`;
      getPhoneOtp(value);
    }
  };

  const handlePhoneInputChange = (val: string): void => {
    setOtpVisible(false);
    fieldValueSetter("phoneNumber", val);
  };

  const handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault();
    const data = getValidatedData();

    if (data !== false) {
      console.log(data);
      const phoneNumber = `+91${data.phoneNumber}`;
      performLogin(phoneNumber, data.otp);
    }
  };

  return (
    <Form
      as="form"
      display="grid"
      gridRowGap={[space.xs]}
      gridAutoFlow="row"
      gridAutoRows="min-content"
      maxWidth="420px"
      onSubmit={handleLogin}
    >
      <PhoneInput
        maxLength={12}
        onValueChanged={handlePhoneInputChange}
        error={fields.phoneNumber.errors[0]}
      />
      {!otpVisible && (
        <Button onClick={handlePhoneNumberSubmit} text="Get OTP" />
      )}
      {otpVisible && (
        <>
          <Text px={16} textStyle="headline6">
            Enter OTP:
          </Text>
          <OtpInput
            autoFocus
            onChange={(val) => fieldValueSetter("otp", val)}
          />
          <Button type="submit" my={[16]} text="Submit" />
        </>
      )}
    </Form>
  );
}
