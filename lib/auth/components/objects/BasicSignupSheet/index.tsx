import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import UserApiClient from "@/auth/api/UserApiClient";
import useAuth from "@/auth/context/AuthContext";
import { Login } from "@/auth/utils";
import { Box, Form, Input, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import toBase64 from "@/common/utils/image/toBase64";

import PictureInput from "../PictureInput";

interface IForm {
  name: string;
  photo?: string;
  email: string;
}

export default function BasicSignupSheet(): JSX.Element {
  const { user, profile } = useAuth();
  const { colors, space } = useTheme();
  const router = useRouter();
  const { track } = useAnalytics();

  const [loading, setLoading] = useState(false);

  const { fields, fieldValueSetter, getValidatedData } = useForm<IForm>({
    fields: {
      name: {
        intialValue: profile?.name ?? "",
        validators: [
          {
            validator: Validators.required,
            message: "Name is required",
          },
        ],
      },
      photo: {
        intialValue: profile?.photo,
        validators: [],
      },
      email: {
        intialValue: user?.email ?? "",
        validators: [
          {
            validator: Validators.required,
            message: "Email is required",
          },
          {
            validator: Validators.email,
            message: "Enter valid email",
          },
        ],
      },
    },
  });

  useEffect(() => {
    if (profile && profile.name) {
      fieldValueSetter("name", profile.name.trim());
    }

    if (profile && profile.photo) {
      fieldValueSetter("photo", profile.photo);
    }

    if (user && user.email) {
      fieldValueSetter("email", user.email);
    }
  }, [user, profile, fieldValueSetter]);

  const handlePhotoChange = useCallback(
    async (photo: File) => {
      const base64Image = await toBase64(photo);
      if (base64Image) {
        fieldValueSetter("photo", base64Image as string);
        track(AnalyticsEvents.profile_picure_added);
      }
    },
    [fieldValueSetter, track]
  );

  const visible = useMemo(() => {
    if (!profile || !user) {
      return false;
    }

    if (!profile.name || !user.email) {
      return true;
    }

    return false;
  }, [profile, user]);

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = getValidatedData();
      if (data) {
        setLoading(true);
        if (profile && profile.photo && profile.photo === data.photo) {
          delete data.photo;
        }

        const { name, photo, email } = data;

        await UserApiClient()
          .postUserProfile({
            photo,
            name: name.trim(),
          })
          .then(async () => {
            if (!user?.email || user?.email !== email) {
              const [userWithToken] = await UserApiClient().postUser({
                email,
              });

              if (userWithToken) {
                await Login("user-update", {
                  user: JSON.stringify(userWithToken.user),
                  token: userWithToken.token,
                });

                track(AnalyticsEvents.sign_up_completed, {
                  name: userWithToken.user.name,
                  email: userWithToken.user.email,
                  photo: userWithToken.user.photo,
                });

                router.reload();
              }
            }
          });

        setLoading(false);
      }
    },
    [getValidatedData, track, profile, router, user]
  );

  return (
    <ModalWithVideo visible={visible}>
      <Form
        display="grid"
        gridAutoFlow="row"
        gridGap={space.xxs}
        onSubmit={handleFormSubmit}
      >
        <PictureInput
          size={[72, 72]}
          disabled={loading}
          photo={fields.photo.value}
          alt={profile?.name}
          onChange={handlePhotoChange}
          error={fields.photo.errors?.[0]}
          m="0 auto"
        />
        <Box>
          <Text m="5px">Full name*</Text>
          <Input
            disabled={loading}
            value={fields.name.value}
            error={fields.name.errors?.[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              fieldValueSetter("name", e.target.value)
            }
          />
        </Box>

        <Box mb={space.xs}>
          <Text m="5px">Email address*</Text>

          <Input
            disabled={loading}
            value={fields.email.value}
            error={fields.email.errors?.[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              fieldValueSetter("email", e.target.value)
            }
          />
        </Box>

        <Button
          variant="nav-button"
          suffixElement={
            loading ? (
              <Spinner
                size={24}
                strokeWidth={2}
                strokeColor={colors.white[0]}
              />
            ) : undefined
          }
          type="submit"
          text="Submit"
          disabled={loading}
          m="0 auto"
        />
        <Text
          variant="terms-conditions"
          color={colors.black[0]}
          textAlign="center"
        >
          Crater may use your phone number for important communication on
          Whatsapp &amp; by clicking Sign Up, you agree to the Terms of service
          &amp; privacy policy.
        </Text>
      </Form>
    </ModalWithVideo>
  );
}
