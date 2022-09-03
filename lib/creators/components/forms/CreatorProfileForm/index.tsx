import { Profile } from "next-auth";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import PhotoUpload from "@/auth/components/objects/PhotoUpload/v2";
import {
  Box,
  Flex,
  Form,
  Grid,
  Icon,
  Input,
  Link,
  Span,
  Spinner,
  Text,
  TextArea,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import FormField from "@/common/components/objects/FormField";
import { PhoneInput } from "@/common/components/objects/PhoneInput/v2";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import { PhoneLib } from "@/common/utils/phone_lib";

export interface ICreatorProfileFormProps {
  name: string;
  introduction?: string;
  email: string;
  primary_url?: string;
  instagram: string | null;
  linkedin_url: string | null;
  twitter: string | null;
  metamask_id: string | null;
}

interface IProps {
  profile: Profile;
  uploadProfilePicture: (file?: File) => Promise<void>;
  uploadCoverPicture: (file?: File) => Promise<void>;
  onSubmit: (data: ICreatorProfileFormProps) => Promise<void>;
}

export default function CreatorProfileForm({
  profile,
  uploadProfilePicture,
  uploadCoverPicture,
  onSubmit,
}: IProps): JSX.Element {
  const { space, colors, borders } = useTheme();
  const [loading, setLoading] = useState(false);

  const { fields, fieldValueSetter, getValidatedData } =
    useForm<ICreatorProfileFormProps>({
      fields: {
        name: {
          intialValue: profile.name ?? "",
          validators: [
            {
              validator: Validators.required,
              message: "Please enter your full name.",
            },
          ],
        },
        email: {
          intialValue: profile.email ?? "",
          validators: [
            {
              validator: Validators.required,
              message: "Please enter your email.",
            },
          ],
        },
        introduction: {
          intialValue: profile.introduction ?? "",
          validators: [],
        },
        primary_url: {
          intialValue: profile.primary_url ?? "",
          validators: [],
        },
        instagram: {
          intialValue: profile.instagram,
          validators: [],
        },
        linkedin_url: {
          intialValue: profile.linkedin_url,
          validators: [],
        },
        twitter: {
          intialValue: profile.twitter,
          validators: [],
        },
        metamask_id: {
          intialValue: profile.metamask_id,
          validators: [],
        },
      },
    });

  const phoneNumber = useMemo(() => {
    return new PhoneLib().parse(profile.phone_number);
  }, [profile]);

  const handleOnSubmit = useCallback(
    async (formData: ICreatorProfileFormProps) => {
      if (onSubmit) {
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
      }
    },
    [onSubmit]
  );

  const onClickSubmit = (): void => {
    const formData = getValidatedData();
    if (formData) {
      handleOnSubmit(formData);
    }
  };

  return (
    <Box>
      <PhotoUpload
        description="File Format: JPEG, PNG or GIF (max 10MB)"
        heading="Profile Picture"
        value={profile.photo}
        onPostData={uploadProfilePicture}
      />

      <Box borderTop={`1px solid ${colors.secondaryLight}`} />

      <PhotoUpload
        previewStyle={{
          w: ["100%", 368],
          h: 146,
          borderRadius: "none",
        }}
        description="File Format: JPEG, PNG or GIF (Recommended 1200x480, max 10 MB)"
        heading="Cover Photo"
        value={profile.cover_file}
        onPostData={uploadCoverPicture}
      />

      <Box borderTop={`1px solid ${colors.secondaryLight}`} />

      <Box>
        <Grid
          p={24}
          gridAutoFlow="column"
          gridTemplateColumns="140px 1fr max-content"
          gridGap={space.s}
        >
          <Text textStyle="formLabel">Basic Details</Text>
          <Form display="grid" gridAutoFlow="row" gridGap={28}>
            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              required={true}
              label="Full Name"
              subtext="Viewers will identify you with this name on Crater. Please enter your full name here."
            >
              <Input
                containerProps={{ width: 556 }}
                value={fields.name.value ?? ""}
                onChange={(e) =>
                  fieldValueSetter("name", e.currentTarget.value)
                }
              />
            </FormField>

            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              label="About Me"
              subtext="Writing a brief description about yourself let's the viewers know more about you and your field of expertise."
            >
              <TextArea
                rows={8}
                inputProps={{
                  width: 556,
                  backgroundColor: colors.primaryBackground,
                  border: `1px solid ${borders.input}`,
                }}
                value={fields.introduction.value ?? ""}
                onChange={(e) =>
                  fieldValueSetter("introduction", e.currentTarget.value)
                }
              />
            </FormField>

            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              required={true}
              label="Phone Number"
              subtext="Currently disabled. Please contact Crater.Club admin to update phone number."
            >
              <PhoneInput
                placeholder=""
                boxProps={{ w: 556, h: 46 }}
                initialValue={phoneNumber?.nationalNumber}
                defaultCountry={phoneNumber?.country}
                disabled={true}
              />
            </FormField>

            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              required={true}
              label="Email"
              subtext="Please enter a working email address."
            >
              <Input
                containerProps={{ width: 556 }}
                value={fields.email.value ?? ""}
                onChange={(e) =>
                  fieldValueSetter("email", e.currentTarget.value)
                }
              />
            </FormField>
          </Form>
        </Grid>

        <Box borderTop={`1px solid ${colors.secondaryLight}`} />

        <Grid
          p={24}
          gridAutoFlow="column"
          gridTemplateColumns="140px 1fr max-content"
          gridGap={space.s}
        >
          <Text textStyle="formLabel">Metamask</Text>
          <FormField
            py={0}
            gridAutoFlow="row"
            gridTemplateColumns="1fr"
            gridGap={space.xxxs}
            border={false}
            label="Metamask Wallet Address"
            subtext="This is a public address that allows you to earn LEARN tokens on Crater."
          >
            <Input
              containerProps={{ width: 556 }}
              value={fields.metamask_id.value ?? ""}
              onChange={(e) =>
                fieldValueSetter("metamask_id", e.currentTarget.value)
              }
            />
          </FormField>
          <Link
            href="https://metamask.io/"
            boxProps={{
              target: "_blank",
              alignSelf: "flex-end",
              pb: space.xxxs,
            }}
          >
            <Flex gridGap={space.xxxxs} cursor="pointer">
              <Text
                textStyle="captionLarge"
                color={colors.accentLight}
                opacity={0.8}
              >
                Know more
              </Text>
              <Icon
                icon="PopOut"
                size={16}
                color={colors.accentLight}
                opacity={0.8}
              />
            </Flex>
          </Link>
        </Grid>

        <Box borderTop={`1px solid ${colors.secondaryLight}`} />

        <Grid
          p={24}
          gridAutoFlow="column"
          gridTemplateColumns="140px 1fr max-content"
          gridGap={space.s}
        >
          <Text textStyle="formLabel">Social Info</Text>
          <Form display="grid" gridAutoFlow="row" gridGap={28}>
            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              label="LinkTree"
            >
              <Input
                placeholder="linktr.ee/username"
                placeholderColor={colors.secondaryLight}
                containerProps={{ width: 556 }}
                prefixElement={
                  <Icon
                    m="1px 10px 2px 2px"
                    icon="LinktreeAlt"
                    size={18}
                    color="#EDEDED"
                    fill={true}
                  />
                }
                value={fields.primary_url.value}
                onChange={(e) =>
                  fieldValueSetter("primary_url", e.currentTarget.value)
                }
              />
            </FormField>
            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              label="LinkedIn"
            >
              <Input
                placeholder="linkedin.com/in/username"
                placeholderColor={colors.secondaryLight}
                containerProps={{ width: 556 }}
                prefixElement={
                  <Icon
                    m="1px 10px 2px 2px"
                    icon="LinkedinAlt"
                    size={18}
                    color="#EDEDED"
                    fill={true}
                  />
                }
                value={fields.linkedin_url.value ?? ""}
                onChange={(e) =>
                  fieldValueSetter("linkedin_url", e.currentTarget.value)
                }
              />
            </FormField>
            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              label="Twitter"
            >
              <Input
                placeholder="twitter.com/username"
                placeholderColor={colors.secondaryLight}
                containerProps={{ width: 556 }}
                prefixElement={
                  <Icon
                    m="1px 10px 2px 2px"
                    icon="Twitter"
                    size={18}
                    color="#EDEDED"
                    fill={true}
                  />
                }
                value={fields.twitter.value ?? ""}
                onChange={(e) =>
                  fieldValueSetter("twitter", e.currentTarget.value)
                }
              />
            </FormField>
            <FormField
              py={0}
              gridAutoFlow="row"
              gridTemplateColumns="1fr"
              gridGap={space.xxxs}
              border={false}
              label="Instagram"
            >
              <Input
                placeholder="instagram.com/username"
                placeholderColor={colors.secondaryLight}
                containerProps={{ width: 556 }}
                prefixElement={
                  <Icon
                    m="1px 10px 2px 2px"
                    icon="InstagramAlt"
                    size={18}
                    color="#EDEDED"
                    fill={true}
                  />
                }
                value={fields.instagram.value ?? ""}
                onChange={(e) =>
                  fieldValueSetter("instagram", e.currentTarget.value)
                }
              />
            </FormField>
          </Form>
        </Grid>

        <Box borderTop={`1px solid ${colors.secondaryLight}`} />

        <Grid
          p={24}
          gridAutoFlow="column"
          gridTemplateColumns="140px 1fr max-content"
          alignItems="center"
          gridGap={space.s}
        >
          <Box />
          <Text textStyle="small" color={colors.textTertiary}>
            Click on <Span color={colors.textPrimary}>Save Changes</Span> to
            reflect changes you have made to your profile.
          </Text>
          <Button
            justifySelf="flex-end"
            label="Save Changes"
            h={40}
            suffixElement={loading ? <Spinner size={24} /> : undefined}
            disabled={loading}
            onClick={onClickSubmit}
          />
        </Grid>
      </Box>
    </Box>
  );
}
