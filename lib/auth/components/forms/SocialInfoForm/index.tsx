import { Profile } from "next-auth";
import { useCallback, useState } from "react";
import { useTheme } from "styled-components";

import {
  Card,
  Form,
  Icon,
  Input,
  Text,
  Grid,
  Flex,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import FormField from "@/common/components/objects/FormField";
import useForm from "@/common/hooks/form/useForm";

export interface ISocialFormProps {
  instagram: string | null;
  linkedin_url: string | null;
  twitter: string | null;
}

interface IProps {
  profile: Profile;
  onSubmit: (data: ISocialFormProps) => Promise<void>;
}

export default function SocialInfoForm({
  profile,
  onSubmit,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const { fields, fieldValueSetter, getValidatedData } =
    useForm<ISocialFormProps>({
      fields: {
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
      },
    });

  const handleOnSubmit = useCallback(
    async (formData: ISocialFormProps) => {
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
    <>
      <Text px={space.xxs} textStyle="headline6">
        Social Info
      </Text>

      <Card
        footer={
          <Flex
            px={space.xs}
            py={space.xs}
            bg={colors.black[2]}
            justifyContent="end"
          >
            <Button
              text="Submit"
              onClick={onClickSubmit}
              suffixElement={loading ? <Spinner size={32} /> : undefined}
              disabled={loading}
            />
          </Flex>
        }
      >
        <Form display="grid" gridAutoFlow="row" gridGap={space.xxxs}>
          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            alignItems="center"
            label={
              <Grid
                gridAutoFlow="column"
                gridAutoColumns="max-content"
                gridGap={space.xxxs}
              >
                <Icon icon="InstagramColor" />
                <Text>Instagram</Text>
              </Grid>
            }
          >
            <Input
              value={fields.instagram.value ?? ""}
              onChange={(e) =>
                fieldValueSetter("instagram", e.currentTarget.value)
              }
            />
          </FormField>

          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            alignItems="center"
            label={
              <Grid
                gridAutoFlow="column"
                gridAutoColumns="max-content"
                gridGap={space.xxxs}
              >
                <Icon icon="Linkedin" fill color={colors.linkedin} />
                <Text>Linkedin</Text>
              </Grid>
            }
          >
            <Input
              value={fields.linkedin_url.value ?? ""}
              onChange={(e) =>
                fieldValueSetter("linkedin_url", e.currentTarget.value)
              }
            />
          </FormField>

          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            alignItems="center"
            label={
              <Grid
                gridAutoFlow="column"
                gridAutoColumns="max-content"
                gridGap={space.xxxs}
              >
                <Icon icon="Twitter" fill color={colors.twitter} />
                <Text>Twitter</Text>
              </Grid>
            }
          >
            <Input
              value={fields.twitter.value ?? ""}
              onChange={(e) =>
                fieldValueSetter("twitter", e.currentTarget.value)
              }
            />
          </FormField>
        </Form>
      </Card>
    </>
  );
}
