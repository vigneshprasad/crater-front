import { SyntheticEvent, useCallback } from "react";
import { useTheme } from "styled-components";

import { Profile } from "@/auth/types/auth";
import {
  Box,
  Form,
  Grid,
  Icon,
  Input,
  Select,
  TextArea,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import useForm from "@/common/hooks/form/useForm";
import toBase64 from "@/common/utils/image/toBase64";

import CoverFileUpload from "../../atoms/CoverFileUpload";
import PictureInput from "../../objects/PictureInput";

type IFormProps = {
  name: string;
  introduction: string;
  photo: string;
};

type IProps = {
  profile: Profile;
  onSubmit: (data: Partial<Profile>) => void;
};

const ProfileForm = ({ profile, onSubmit }: IProps) => {
  const { space, colors } = useTheme();
  const { fields, fieldValueSetter, getValidatedData } = useForm<IFormProps>({
    fields: {
      name: {
        intialValue: profile.name ?? "",
        validators: [],
      },
      introduction: {
        intialValue: "",
        validators: [],
      },
      photo: {
        intialValue: "",
        validators: [],
      },
    },
  });

  const submitForm = useCallback(
    (data: Partial<Profile>) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  const handleProfilePhotoChange = async (file: File) => {
    const data = (await toBase64(file)) as string;
    fieldValueSetter("photo", data);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const data = getValidatedData();
    if (data) {
      submitForm(data);
    }
  };

  return (
    <Form
      display="grid"
      gridGap={24}
      gridAutoFlow="row"
      onSubmit={handleSubmit}
    >
      <CoverFileUpload coverImage={profile.cover_file} alt={profile.name} />
      <Grid
        px={[space.s]}
        py={[space.s]}
        gridGap={space.s}
        gridTemplateColumns="min-content 1fr"
      >
        <Box>
          <PictureInput
            photo={profile.photo}
            alt={profile.name}
            onChange={handleProfilePhotoChange}
          />
        </Box>
        <Grid flexDirection="column" gridAutoFlow="rows" gridGap={space.xs}>
          <Input
            placeholder="Your name"
            value={fields.name.value}
            onChange={(val) => fieldValueSetter("name", val.target.value)}
          />
          <TextArea
            placeholder="About Me"
            value={fields.introduction.value}
            onChange={(val) =>
              fieldValueSetter("introduction", val.target.value)
            }
          />
          <Grid gridTemplateColumns="repeat(3, 1fr)" gridGap={space.xs}>
            <Input
              prefixElement={<Icon icon="Twitter" color={colors.twitter} />}
            />
            <Input prefixElement={<Icon icon="InstagramColor" />} />
            <Input
              prefixElement={<Icon icon="Linkedin" color={colors.linkedin} />}
            />
          </Grid>
          <Grid gridTemplateColumns="1fr 1fr" gridGap={space.xs}>
            <Select
              items={[
                { id: 0, value: "Design" },
                { id: 1, value: "Soccer" },
              ]}
              label="Pick a Tag"
            />
          </Grid>
        </Grid>
      </Grid>
      <Button type="submit" text="Submit" />
    </Form>
  );
};

export default ProfileForm;
