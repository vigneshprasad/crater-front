import { SyntheticEvent, useCallback } from "react";
import { useTheme } from "styled-components";

import {
  Form,
  Text,
  Input,
  Flex,
  TextArea,
  Card,
  Grid,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { MultiSelect } from "@/common/components/atoms/MultiSelect";
import DateTimeInput from "@/common/components/objects/DateTimeInput";
import FormField from "@/common/components/objects/FormField";
import ImageDropBox from "@/common/components/objects/ImageDropBox";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import DateTime from "@/common/utils/datetime/DateTime";
import toBase64 from "@/common/utils/image/toBase64";
import CreatorApiClient from "@/creators/api";
import {
  CreateWebinar,
  StreamCategory,
  StreamFormArgs,
} from "@/creators/types/stream";

export default function ScheduleStreamForm(): JSX.Element {
  const { space, colors } = useTheme();

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

        try {
          await CreatorApiClient().postStream(formData);
          clearForm();
        } catch (e) {
          console.log(e);
        }
      }
    },
    [getValidatedData, clearForm]
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
      m="0 auto"
      maxWidth="1000px"
      footer={
        <Flex
          px={space.xs}
          py={space.xs}
          bg={colors.black[2]}
          justifyContent="center"
        >
          <Button
            text="Submit"
            type="submit"
            onClick={handleScheduleStreamCreation}
          />
        </Flex>
      }
    >
      <Form display="grid" gridAutoFlow="row" gridGap={space.xxs}>
        <FormField label="Title">
          <Input
            value={fields.topic.value}
            onChange={(e) => {
              fieldValueSetter("topic", e.currentTarget.value);
            }}
            error={fields.topic.errors[0]}
          />
        </FormField>

        <FormField label="Description" subtext="(optional)">
          <TextArea
            value={fields.description.value}
            onChange={(e) => {
              fieldValueSetter("description", e.currentTarget.value);
            }}
          />
        </FormField>

        <FormField label="Category">
          <MultiSelect<StreamCategory>
            placeholder="Select one or more categories"
            dataUrl={API_URL_CONSTANTS.stream.getCategories}
            labelGetter={(item) => item.name}
            onChange={(val) => fieldValueSetter("categories", val)}
            maxLength={3}
            value={fields.categories.value}
            error={fields.categories.errors[0]}
          />
        </FormField>

        <Grid gridAutoFlow="column" gridGap={space.xs}>
          <FormField label="Date">
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
        </Grid>

        <FormField label="Co-host">
          <Text>Coming Soon!</Text>
        </FormField>

        <FormField label="Cover Photo" subtext="(optional)">
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
