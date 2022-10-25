import { signOut } from "next-auth/client";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import AuthApiClient from "@/auth/api";
import { Login } from "@/auth/utils";
import { Form, Spinner, Text } from "@/common/components/atoms";
import { Button, Input } from "@/common/components/atoms/v2";
import { OtpInput } from "@/common/components/objects/OtpInput";
import { PhoneInput } from "@/common/components/objects/PhoneInput/v2";
import {
  UTM_SOURCE_STORAGE_KEY,
  UTM_CAMPAIGN_STORAGE_KEY,
  UTM_MEDIUM_STORAGE_KEY,
  REFERRER_ID_STORAGE_KEY,
} from "@/common/constants/global.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";

type AuthFormArgs = {
  name: string;
  phoneNumber: string;
  otp: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  referrerId?: string;
};

type IProps = {
  postSubmit?: () => void;
};

export default function LandingAuthForm({
  postSubmit,
}: IProps): JSX.Element | null {
  const router = useRouter();
  const { track } = useAnalytics();
  const { space, colors, breakpoints } = useTheme();
  const [otpVisible, setOtpVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const { fields, fieldValueSetter, getValidatedData, validateField } =
    useForm<AuthFormArgs>({
      fields: {
        name: {
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "Please enter a name",
            },
          ],
        },
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
        utmMedium: {
          intialValue: "",
          validators: [],
        },
        referrerId: {
          intialValue: "",
          validators: [],
        },
      },
    });

  useEffect(() => {
    if (router) {
      const utmSource = localStorage.getItem(UTM_SOURCE_STORAGE_KEY);
      const utmCampaign = localStorage.getItem(UTM_CAMPAIGN_STORAGE_KEY);
      const utmMedium = localStorage.getItem(UTM_MEDIUM_STORAGE_KEY);
      const referrerId = localStorage.getItem(REFERRER_ID_STORAGE_KEY);
      if (utmSource || utmCampaign || referrerId) {
        fieldValueSetter("utmSource", utmSource ?? "");
        fieldValueSetter("utmCampaign", utmCampaign ?? "");
        fieldValueSetter("utmMedium", utmMedium ?? "");
        fieldValueSetter("referrerId", referrerId ?? "");
      }
    }
  }, [router, fieldValueSetter]);

  const getPhoneOtp = async (phoneNumber: string): Promise<void> => {
    setLoading(true);
    // Signout user
    await signOut({ redirect: false });
    try {
      await AuthApiClient.getPhoneOtp(phoneNumber);
      track(AnalyticsEvents.web3_landing_get_otp_clicked, {
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
    name: string,
    phoneNumber: string,
    otp: string,
    utmSource?: string,
    utmCampaign?: string,
    utmMedium?: string,
    referrerId?: string
  ): Promise<void> => {
    setLoading(true);
    try {
      await Login("phone-auth", {
        phoneNumber,
        otp,
        utmSource,
        utmCampaign,
        utmMedium,
        referrerId,
        name,
      });
      track(AnalyticsEvents.web3_landing_phone_verified, {
        phoneNumber,
      });
      postSubmit && postSubmit();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setOtpVisible(false);
    setLoading(false);
  };

  const handlePrimaryDataSubmit = (): void => {
    const phoneNumberValid = validateField("phoneNumber");
    const nameValid = validateField("name");

    if (phoneNumberValid && nameValid) {
      const phoneNumber = fields.phoneNumber.value;
      getPhoneOtp(phoneNumber);
    }
  };

  const handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault();
    const data = getValidatedData();

    if (data !== false) {
      const phoneNumber = data.phoneNumber;
      const name = data.name;
      performLogin(
        name,
        phoneNumber,
        data.otp,
        data.utmSource,
        data.utmCampaign,
        data.utmMedium,
        data.referrerId
      );
    }
  };

  if (isMobile === undefined) return null;

  return (
    <Form
      as="form"
      display="grid"
      gridAutoFlow="row"
      gridAutoRows="min-content"
      gridGap={space.xs}
      maxWidth={["100%", 332]}
      onSubmit={handleLogin}
    >
      {!otpVisible && (
        <>
          <Input
            label="Name"
            placeholder="Name"
            disabled={loading}
            onChange={(e) => fieldValueSetter("name", e.currentTarget.value)}
            error={fields.name.errors[0]}
          />

          <PhoneInput
            placeholder="Phone Number"
            disabled={loading}
            onValueChanged={(value) => fieldValueSetter("phoneNumber", value)}
            error={fields.phoneNumber.errors[0]}
          />

          <Button
            mt={space.xxs}
            label="Get Started"
            w="100%"
            h={44}
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
            onClick={handlePrimaryDataSubmit}
          />
        </>
      )}

      {otpVisible && (
        <>
          <Text textStyle="captionLarge">
            Please verify the OTP sent to your phone number
          </Text>
          <OtpInput
            disabled={loading}
            autoFocus
            onChange={(val) => fieldValueSetter("otp", val)}
          />
          <Button
            type="submit"
            mt={space.xxs}
            label="Verify"
            w="100%"
            h={44}
            disabled={loading}
            suffixElement={
              loading ? (
                <Spinner
                  size={24}
                  strokeWidth={2}
                  strokeColor={colors.white[0]}
                />
              ) : undefined
            }
          />
        </>
      )}
    </Form>
  );
}
