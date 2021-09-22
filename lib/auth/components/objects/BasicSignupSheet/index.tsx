import { useMemo } from "react";
import { SyntheticEvent, useCallback, useEffect } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import UserApiClient from "@/auth/api/UserApiClient";
import useAuth from "@/auth/context/AuthContext";
import { Login } from "@/auth/utils";
import { Box, Text, Form, Input } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import toBase64 from "@/common/utils/image/toBase64";

import PictureInput from "../PictureInput";

interface IForm {
  name: string;
  photo?: string;
  email: string;
}

export default function BasicSignupSheet(): JSX.Element {
  const { user, profile } = useAuth();
  const { space } = useTheme();
  const router = useRouter();

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
        validators: [
          {
            validator: Validators.required,
            message: "Photo is required",
          },
        ],
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
      fieldValueSetter("name", profile.name);
    }

    if (profile && profile.photo) {
      fieldValueSetter("photo", profile.photo);
    }

    if (user && user.email) {
      fieldValueSetter("email", user.email);
    }
  }, [user, profile, fieldValueSetter]);

  const handlePhotoChange = async (photo: File): Promise<void> => {
    const base64Image = await toBase64(photo);
    if (base64Image) {
      fieldValueSetter("photo", base64Image as string);
    }
  };

  const visible = useMemo(() => {
    if (!profile || !user) {
      return false;
    }

    if (!profile.name || !profile.photo || !user.email) {
      return true;
    }

    return false;
  }, [profile, user]);

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = getValidatedData();
      if (data) {
        if (profile && profile.photo && profile.photo === data.photo) {
          delete data.photo;
        }

        const { name, photo, email } = data;

        await UserApiClient()
          .postUserProfile({
            photo,
            name,
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

                router.reload();
              }
            }
          });
      }
    },
    [getValidatedData, profile, router, user]
  );

  return (
    <ModalWithVideo maxWidth={["calc(100% - 32px)", 960]} visible={visible}>
      <Box py={space.xs}>
        <Text textStyle="headline5" maxWidth="60%">
          Hey, please provide some basic information
        </Text>
      </Box>
      <Form
        display="grid"
        gridAutoFlow="row"
        gridGap={space.xxs}
        onSubmit={handleFormSubmit}
      >
        <PictureInput
          photo={fields.photo.value}
          alt={profile?.name}
          onChange={handlePhotoChange}
          error={fields.photo.errors?.[0]}
        />
        <Box>
          <Input
            placeholder="Your Name"
            value={fields.name.value}
            error={fields.name.errors?.[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              fieldValueSetter("name", e.target.value)
            }
          />
        </Box>

        <Box>
          <Input
            placeholder="Your email address"
            value={fields.email.value}
            error={fields.email.errors?.[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              fieldValueSetter("email", e.target.value)
            }
          />
        </Box>

        <Button type="submit" text="Submit" />
      </Form>
    </ModalWithVideo>
  );
}
