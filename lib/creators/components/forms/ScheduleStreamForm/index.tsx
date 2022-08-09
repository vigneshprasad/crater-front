import { SyntheticEvent, useCallback, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Form,
  Input,
  Flex,
  TextArea,
  Card,
  Grid,
  Text,
  Box,
  Spinner,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { MultiSelect } from "@/common/components/atoms/MultiSelect";
import DateTimeInput from "@/common/components/objects/DateTimeInput";
import FormField from "@/common/components/objects/FormField";
import {
  API_URL_CONSTANTS,
  BECOME_CREATOR_CALENDLY,
} from "@/common/constants/url.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import { BaseApiError } from "@/common/types/api";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";
import CreatorApiClient from "@/creators/api";
import {
  CreateWebinar,
  StreamCategory,
  StreamFormArgs,
} from "@/creators/types/stream";

import StreamCoverPhotoUpload from "../../objects/StreamCoverPhotoUpload";

interface IProps {
  permission?: boolean;
  onSubmitComplete?: (stream: Webinar) => void;
}

export default function ScheduleStreamForm({
  permission,
  onSubmitComplete,
}: IProps): JSX.Element {
  const { space, colors, borders } = useTheme();
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();

  const {
    fields,
    fieldValueSetter,
    getValidatedData,
    clearForm,
    fieldErrorSetter,
  } = useForm<StreamFormArgs>({
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
        validators: [
          {
            validator: Validators.required,
            message: "Cover photo is required",
          },
        ],
      },
      start: {
        intialValue: DateTime.now().plus({ minutes: 15 }),
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
      rtmp_link: {
        intialValue: undefined,
        validators: [],
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
          rtmp_link: data.rtmp_link ? data.rtmp_link : undefined,
        };

        setLoading(true);

        const [res, err] = await CreatorApiClient().postStream(formData);

        if (err) {
          if (err.response && err.response.data) {
            const error = err.response.data as BaseApiError;
            if (
              error.error_code === "groupStartDateTimeNotInFuture" ||
              error.error_code === "groupStartLessThan15Minutes"
            ) {
              fieldErrorSetter("start", error.error_message);
            }
          }
        }

        if (res) {
          clearForm();
          if (onSubmitComplete) {
            onSubmitComplete(res);
          }
        }

        setLoading(false);
      }
    },
    [getValidatedData, clearForm, onSubmitComplete, fieldErrorSetter]
  );

  return (
    <Card
      position="relative"
      my={space.xxs}
      containerProps={{ py: space.xs }}
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
            disabled={loading}
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
          required={true}
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
          required={true}
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
          <Input disabled placeholder="Coming soon" />
        </FormField>

        <FormField
          label="Date"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
          required={true}
        >
          <DateTimeInput
            error={fields.start.errors[0]}
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
            rows={9}
            value={fields.description.value}
            inputProps={{
              backgroundColor: colors.primaryBackground,
              border: `1px solid ${borders.input}`,
            }}
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
          required={true}
        >
          <StreamCoverPhotoUpload
            profile={profile}
            topic={fields.topic.value}
            onChange={(image) => fieldValueSetter("image", image)}
          />
          {/* <ImageDropBox
            error={fields.image.errors[0]}
            alt="cover photo"
            value={fields.image.value}
            onChange={handlePhotoChange}
          /> */}
        </FormField>

        <FormField
          label="RTMP Link"
          subtext="Stream to Youtube, Twitter, LinkedIn or Facebook"
          gridTemplateColumns="1fr"
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxxs}
          border={false}
        >
          <Input
            value={fields.rtmp_link.value}
            onChange={(e) => {
              fieldValueSetter("rtmp_link", e.currentTarget.value);
            }}
          />
        </FormField>
      </Form>
      {!permission && (
        <Grid
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg="rgba(0,0,0,0.8)"
        >
          <Box m="auto auto" textAlign="center">
            <Text m="auto auto">Do you want to stream? Connect with us</Text>
            <a href={BECOME_CREATOR_CALENDLY} target="_blank" rel="noreferrer">
              <Button m="16px auto" text="Become a Creator" />
            </a>
          </Box>
        </Grid>
      )}
    </Card>
  );
}
