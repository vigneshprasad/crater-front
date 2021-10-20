import { SyntheticEvent, useCallback, useState } from "react";
import { useTheme } from "styled-components";

import { Form, Input, Flex, TextArea, Card } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { MultiSelect } from "@/common/components/atoms/MultiSelect";
import Spinner from "@/common/components/atoms/Spiner";
import DateTimeInput from "@/common/components/objects/DateTimeInput";
import FormField from "@/common/components/objects/FormField";
import ImageDropBox from "@/common/components/objects/ImageDropBox";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import DateTime from "@/common/utils/datetime/DateTime";
import toBase64 from "@/common/utils/image/toBase64";
import { Webinar } from "@/community/types/community";
import CreatorApiClient from "@/creators/api";
import {
  CreateWebinar,
  StreamCategory,
  StreamFormArgs,
} from "@/creators/types/stream";

interface IProps {
  onSubmitComplete?: (stream: Webinar) => void;
}

export default function ScheduleStreamForm({
  onSubmitComplete,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const { fields, fieldValueSetter, getValidatedData, clearForm } =
    useForm<StreamFormArgs>({
      fields: {
        topic: {
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "Title is required",
            },
          ],
        },
        description: {
          intialValue: "",
          validators: [],
        },
        image: {
          intialValue: "",
          validators: [],
        },
        start: {
          intialValue: DateTime.now(),
          validators: [
            {
              validator: Validators.required,
              message: "Date & Time is required",
            },
          ],
        },
        categories: {
          intialValue: [],
          validators: [
            {
              validator: Validators.minLength,
              message: "Categories are required",
            },
          ],
        },
      },
    });

  const handleScheduleStreamCreation = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = getValidatedData();
      if (data) {
        if (!data.image) {
          delete data.image;
        }

        const formData: CreateWebinar = {
          topic_title: data.topic,
          topic_image: data.image,
          description: data.description,
          start: data.start.toISO(),
          categories: data.categories.map((category) => category.pk),
        };

        setLoading(true);

        const [res] = await CreatorApiClient().postStream(formData);

        if (res) {
          clearForm();
          if (onSubmitComplete) {
            onSubmitComplete(res);
          }
        }

        setLoading(false);
      }
    },
    [getValidatedData, clearForm, onSubmitComplete]
  );

  const handlePhotoChange = useCallback(
    async (photo: File) => {
      const base64Image = await toBase64(photo);
      if (base64Image) {
        fieldValueSetter("image", base64Image as string);
      }
    },
    [fieldValueSetter]
  );

  return (
    <Card
      my={space.s}
      containerProps={{ py: space.xxs }}
      maxWidth={960}
      footer={
        <Flex
          px={space.xs}
          py={space.xs}
          bg={colors.black[2]}
          justifyContent="end"
        >
          <Button
            text="Submit"
            type="submit"
            onClick={handleScheduleStreamCreation}
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
        </Flex>
      }
    >
      <Form
        display="grid"
        gridTemplateColumns={["1fr", "1fr 1fr"]}
        gridRowGap={space.xxxs}
        gridColumnGap={space.xs}
      >
        <FormField
          label="Title"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
        >
          <Input
            value={fields.topic.value}
            onChange={(e) => {
              fieldValueSetter("topic", e.currentTarget.value);
            }}
            error={fields.topic.errors[0]}
          />
        </FormField>

        <FormField
          label="Category"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
        >
          <MultiSelect<StreamCategory>
            placeholder="Pick categories"
            dataUrl={API_URL_CONSTANTS.stream.getCategories}
            labelGetter={(item) => item.name}
            onChange={(val) => fieldValueSetter("categories", val)}
            maxLength={3}
            value={fields.categories.value}
            error={fields.categories.errors[0]}
          />
        </FormField>

        <FormField
          label="Co-host"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
        >
          <Input disabled placeholder="Comming soon" />
        </FormField>

        <FormField
          label="Date"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
        >
          <DateTimeInput
            placeholder="Enter Datetime"
            type="datetime-local"
            value={fields.start.value.toFormat(
              DateTime.DEFAULT_DATETIME_INPUT_FORMAT
            )}
            onChange={(e) => {
              fieldValueSetter(
                "start",
                DateTime.fromFormat(
                  e.currentTarget.value,
                  DateTime.DEFAULT_DATETIME_INPUT_FORMAT
                )
              );
            }}
          />
        </FormField>

        <FormField
          label="Description"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
        >
          <TextArea
            value={fields.description.value}
            onChange={(e) => {
              fieldValueSetter("description", e.currentTarget.value);
            }}
          />
        </FormField>

        <FormField
          label="Cover Photo"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
        >
          <ImageDropBox
            alt="cover photo"
            value={fields.image.value}
            onChange={handlePhotoChange}
          />
        </FormField>
      </Form>
    </Card>
  );
}
