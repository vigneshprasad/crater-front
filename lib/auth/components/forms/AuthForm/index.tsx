import { signOut } from "next-auth/client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import AuthApiClient from "@/auth/api";
import { Login } from "@/auth/utils";
import { Form, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import { OtpInput } from "@/common/components/objects/OtpInput";
import { PhoneInput } from "@/common/components/objects/PhoneInput";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";

type AuthFormArgs = {
  phoneNumber: string;
  otp: string;
  utmSource?: string;
  utmCampaign?: string;
};

export default function AuthForm(): JSX.Element {
  const router = useRouter();
  const { track } = useAnalytics();
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
            {
              validator: Validators.required,
              message: "Please enter a phone number",
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
        utmSource: {
          intialValue: "",
          validators: [],
        },
        utmCampaign: {
          intialValue: "",
          validators: [],
        },
      },
    });

  const [otpVisible, setOtpVisible] = useState(false);
  const { space, colors } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router) {
      const { utm_source: utmSource, utm_campaign: utmCampaign } = router.query;
      if (utmSource || utmCampaign) {
        fieldValueSetter("utmSource", utmSource as string);
        fieldValueSetter("utmCampaign", utmCampaign as string);
      }
    }
  }, [router, fieldValueSetter]);

  const getPhoneOtp = async (phoneNumber: string): Promise<void> => {
    setLoading(true);
    // Signout user
    await signOut({ redirect: false });
    try {
      await AuthApiClient.getPhoneOtp(phoneNumber);
      track(AnalyticsEvents.get_otp_clicked, {
        phoneNumber,
      });
      setOtpVisible(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setLoading(false);
  };

  const performLogin = async (
    phoneNumber: string,
    otp: string,
    utmSource?: string,
    utmCampaign?: string
  ): Promise<void> => {
    try {
      await Login("phone-auth", { phoneNumber, otp, utmSource, utmCampaign });
      track(AnalyticsEvents.phone_verified, {
        phoneNumber,
      });
      router.reload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handlePhoneNumberSubmit = (): void => {
    const valid = validateField("phoneNumber");

    if (valid) {
      const value = fields.phoneNumber.value;
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
      const phoneNumber = data.phoneNumber;
      performLogin(phoneNumber, data.otp, data.utmSource, data.utmCampaign);
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
        disabled={loading}
        maxLength={12}
        onValueChanged={handlePhoneInputChange}
        error={fields.phoneNumber.errors[0]}
      />
      {!otpVisible && (
        <Button
          suffixElement={
            loading ? (
              <Spinner
                size={24}
                strokeWidth={2}
                strokeColor={colors.white[0]}
              />
            ) : undefined
          }
          disabled={loading}
          onClick={handlePhoneNumberSubmit}
          text="Get OTP"
          m="0 auto"
        />
      )}
      {otpVisible && (
        <>
          <Text px={16} textStyle="headline6">
            Enter OTP:
          </Text>
          <OtpInput
            disabled={loading}
            autoFocus
            onChange={(val) => fieldValueSetter("otp", val)}
          />
          <Button
            suffixElement={
              loading ? (
                <Spinner
                  size={24}
                  strokeWidth={2}
                  strokeColor={colors.white[0]}
                />
              ) : undefined
            }
            disabled={loading}
            type="submit"
            my={[16]}
            text="Submit"
            m="0 auto"
          />
        </>
      )}
    </Form>
  );
}
