import { useCallback } from "react";
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
  onSubmit: (data: IBasicProfileFormProps) => void;
}

export default function BasicProfileForm({
  onSubmit,
  data,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

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
    (formData: IBasicProfileFormProps) => {
      if (onSubmit) {
        onSubmit(formData);
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
            <Button text="Submit" onClick={onClickSubmit} />
          </Flex>
        }
      >
        <Form display="grid" gridAutoFlow="row" gridGap={space.xxs}>
          <FormField label="Full Name" subtext="This is your name">
            <Input
              value={fields.name.value}
              onChange={(e) => fieldValueSetter("name", e.currentTarget.value)}
            />
          </FormField>

          <FormField label="About Me" subtext="This is your name">
            <TextArea
              value={fields.introduction.value}
              onChange={(e) => {
                fieldValueSetter("introduction", e.currentTarget.value);
              }}
            />
          </FormField>

          <FormField label="Tags" subtext="Pick a tag which suits you">
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
            label="Education Level"
            subtext="Pick a tag which suits you"
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
            label="Years of experience"
            subtext="Pick a tag which suits you"
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
            label="Sector"
            subtext="Pick a tag which suits you"
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
