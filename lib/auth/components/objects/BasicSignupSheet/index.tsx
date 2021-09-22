import { SyntheticEvent, useCallback, useEffect } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import UserApiClient from "@/auth/api/UserApiClient";
import useAuth from "@/auth/context/AuthContext";
import { Box, Modal, Text, Form, Input } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import toBase64 from "@/common/utils/image/toBase64";

import PictureInput from "../PictureInput";

interface IProps {
  visible: boolean;
}

interface IForm {
  name: string;
  photo?: string;
}

export default function BasicSignupSheet({ visible }: IProps): JSX.Element {
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
    },
  });

  useEffect(() => {
    if (profile && profile.name) {
      fieldValueSetter("name", profile.name);
    }

    if (profile && profile.photo) {
      fieldValueSetter("photo", profile.photo);
    }
  }, [user, profile, fieldValueSetter]);

  const handlePhotoChange = async (photo: File): Promise<void> => {
    const base64Image = await toBase64(photo);
    if (base64Image) {
      fieldValueSetter("photo", base64Image as string);
    }
  };

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = getValidatedData();
      if (data) {
        if (profile && profile.photo && profile.photo === data.photo) {
          delete data.photo;
        }

        const { name, photo } = data;

        await UserApiClient().postUserProfile({
          photo,
          name,
        });

        router.reload();
      }
    },
    [getValidatedData, profile, router]
  );

  return (
    <Modal
      visible={visible}
      onClose={() => {
        console.log("Heloo");
      }}
    >
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
        />
        <Box>
          <Input
            placeholder="Your Name"
            value={fields.name.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              fieldValueSetter("name", e.target.value)
            }
          />
        </Box>

        <Button type="submit" text="Submit" />
      </Form>
    </Modal>
  );
}
