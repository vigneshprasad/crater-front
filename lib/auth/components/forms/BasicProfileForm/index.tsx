import { useCallback, useState } from "react";
import { useTheme } from "styled-components";

import {
  EducationLevel,
  Profile,
  Sector,
  UserTag,
  YearsOfExperience,
} from "@/auth/types/auth";
import {
  Flex,
  Text,
  Card,
  Form,
  Input,
  TextArea,
  Select,
  Spinner,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import FormField from "@/common/components/objects/FormField";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useForm from "@/common/hooks/form/useForm";

export interface IBasicProfileFormProps {
  name: string;
  introduction: string;
  tags?: number;
  education_level?: number;
  years_of_experience?: number;
  sector?: number;
}

interface IProps {
  data: Profile;
  onSubmit: (data: IBasicProfileFormProps) => Promise<void>;
}

export default function BasicProfileForm({
  onSubmit,
  data,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const { fields, fieldValueSetter, getValidatedData } =
    useForm<IBasicProfileFormProps>({
      fields: {
        name: {
          intialValue: data.name ?? "",
          validators: [],
        },
        introduction: {
          intialValue: data.introduction ?? "",
          validators: [],
        },
        tags: {
          intialValue: data.tag_list?.[0]?.pk,
          validators: [],
        },
        years_of_experience: {
          intialValue: data.years_of_experience,
          validators: [],
        },
        education_level: {
          intialValue: data.education_level,
          validators: [],
        },
        sector: {
          intialValue: data.sector,
          validators: [],
        },
      },
    });

  const handleOnSubmit = useCallback(
    async (formData: IBasicProfileFormProps) => {
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
        Basic Profile
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
            label="Full Name"
            subtext="Enter your full name."
          >
            <Input
              value={fields.name.value}
              disabled={loading}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                fieldValueSetter("name", e.currentTarget.value)
              }
            />
          </FormField>

          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            label="About Me"
            subtext="Give a brief description about yourself."
          >
            <TextArea
              disabled={loading}
              value={fields.introduction.value}
              onChange={(e) => {
                fieldValueSetter("introduction", e.currentTarget.value);
              }}
            />
          </FormField>

          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            label="Tags"
            subtext="Pick a tag which suits you."
          >
            <Select<UserTag>
              async
              value={fields.tags.value}
              label="Pick a tag"
              itemLabelGetter={(tag) => tag.name}
              dataUrl={API_URL_CONSTANTS.meta.userTags}
              dataTransform={(val) => val.pk}
              onChange={(val) => fieldValueSetter("tags", val as number)}
            />
          </FormField>

          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            label="Education Level"
            subtext="Pick the highest level of your education."
          >
            <Select<EducationLevel>
              async
              value={fields.education_level.value}
              label="Pick an option"
              dataTransform={(val) => val.value}
              itemLabelGetter={(tag) => tag.name}
              dataUrl={API_URL_CONSTANTS.meta.education}
              onChange={(val) =>
                fieldValueSetter("education_level", val as number)
              }
            />
          </FormField>

          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            label="Years of experience"
            subtext="Pick the range of your years of experience."
          >
            <Select<YearsOfExperience>
              async
              value={fields.years_of_experience.value}
              dataTransform={(val) => val.value}
              label="Pick an option"
              itemLabelGetter={(tag) => tag.name}
              dataUrl={API_URL_CONSTANTS.meta.experience}
              onChange={(val) =>
                fieldValueSetter("years_of_experience", val as number)
              }
            />
          </FormField>

          <FormField
            gridTemplateColumns={["1fr", "1fr 2fr"]}
            gridGap={space.xxxs}
            label="Sector"
            subtext="Pick a sector of your profession."
            border={false}
          >
            <Select<Sector>
              async
              value={fields.sector.value}
              dataTransform={(val) => val.value}
              label="Pick an option"
              itemLabelGetter={(tag) => tag.name}
              dataUrl={API_URL_CONSTANTS.meta.sector}
              onChange={(val) => fieldValueSetter("sector", val as number)}
            />
          </FormField>
        </Form>
      </Card>
    </>
  );
}
