import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Flex,
  Form,
  Icon,
  Spinner,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import { BaseApiError } from "@/common/types/api";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";
import CreatorApiClient from "@/creators/api";
import { CreateWebinar, StreamCategory } from "@/creators/types/stream";
import { StreamCreationSteps } from "@/stream/types/stream";

import BasicDetailsForm from "./BasicDetailsForm";
import GetStartedForm from "./GetStartedForm";
import OtherSettingsForm from "./OtherSettingsForm";
import ThumbnailForm from "./ThumbnailForm";

const CustomBox = styled(Box)`
  ::-webkit-scrollbar {
    display: block;
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { colors } }) => colors.secondaryLight};
  }
`;

export interface IStreamCreationFormProps {
  category?: StreamCategory;
  topic: string;
  description?: string;
  dateAndTime: DateTime;
  image: string;
  rtmpLink?: string;
  rtmpKey?: string;
}

type IProps = {
  activeStep: StreamCreationSteps;
  setActiveStep: Dispatch<SetStateAction<number>>;
  postSubmit: (stream: Webinar) => void;
};

const STREAM_CREATION_PAGES = [
  StreamCreationSteps.GetStarted,
  StreamCreationSteps.BasicDetails,
  StreamCreationSteps.AddThumbnail,
  StreamCreationSteps.OtherSettings,
];

export default function StreamCreationForm({
  activeStep,
  setActiveStep,
  postSubmit,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const nextPage = useCallback(
    (event: SyntheticEvent): void => {
      event.preventDefault();

      const lastIndex = STREAM_CREATION_PAGES.length - 1;

      if (lastIndex - STREAM_CREATION_PAGES[activeStep] === 0) return;

      setActiveStep((prevValue) => prevValue + 1);
    },
    [activeStep, setActiveStep]
  );

  const previousPage = useCallback(
    (event: SyntheticEvent): void => {
      event.preventDefault();
      if (STREAM_CREATION_PAGES[activeStep] === 0) return;

      setActiveStep((prevValue) => prevValue - 1);
    },
    [activeStep, setActiveStep]
  );

  const {
    fields,
    fieldValueSetter,
    fieldErrorSetter,
    getValidatedData,
    clearForm,
  } = useForm<IStreamCreationFormProps>({
    fields: {
      category: {
        intialValue: undefined,
        validators: [
          {
            validator: Validators.required,
            message: "Category is required.",
          },
        ],
      },
      topic: {
        intialValue: "",
        validators: [
          {
            validator: Validators.required,
            message: "Topic is required.",
          },
        ],
      },
      description: {
        intialValue: "",
        validators: [],
      },
      dateAndTime: {
        intialValue: DateTime.now().plus({ day: 1 }),
        validators: [
          {
            validator: Validators.required,
            message: "Time & Date is required.",
          },
        ],
      },
      image: {
        intialValue: "",
        validators: [
          {
            validator: Validators.required,
            message: "Thumbnail is required.",
          },
        ],
      },
      rtmpLink: {
        intialValue: "",
        validators: [],
      },
      rtmpKey: {
        intialValue: "",
        validators: [],
      },
    },
  });

  const formToRender = useMemo<JSX.Element | undefined>(() => {
    if (activeStep === StreamCreationSteps.GetStarted) {
      return (
        <GetStartedForm
          value={fields.category.value}
          error={fields.category.errors[0]}
          onChange={(val) =>
            fieldValueSetter("category", val as StreamCategory)
          }
        />
      );
    }

    if (activeStep === StreamCreationSteps.BasicDetails) {
      return (
        <BasicDetailsForm
          category={fields.category.value?.pk}
          topic={{
            value: fields.topic.value,
            error: fields.topic.errors[0],
            onChange: (val) => fieldValueSetter("topic", val as string),
          }}
          description={{
            value: fields.description.value ?? "",
            onChange: (val) => fieldValueSetter("description", val as string),
          }}
          dateAndTime={{
            value: fields.dateAndTime.value.toFormat(
              DateTime.DEFAULT_DATETIME_INPUT_FORMAT
            ),
            error: fields.dateAndTime.errors[0],
            onChange: (val) =>
              fieldValueSetter(
                "dateAndTime",
                DateTime.fromFormat(
                  val as string,
                  DateTime.DEFAULT_DATETIME_INPUT_FORMAT
                )
              ),
          }}
        />
      );
    }

    if (activeStep === StreamCreationSteps.AddThumbnail) {
      return (
        <ThumbnailForm
          topic={fields.topic.value}
          profile={profile}
          image={{
            value: fields.image.value,
            error: fields.image.errors[0],
            onChange: (val) => fieldValueSetter("image", val as string),
          }}
        />
      );
    }

    if (activeStep === StreamCreationSteps.OtherSettings) {
      return (
        <OtherSettingsForm
          rtmpLink={{
            value: fields.rtmpLink.value ?? "",
            error: fields.rtmpLink.errors[0],
            onChange: (val) => fieldValueSetter("rtmpLink", val as string),
          }}
          rtmpKey={{
            value: fields.rtmpKey.value ?? "",
            error: fields.rtmpKey.errors[0],
            onChange: (val) => fieldValueSetter("rtmpKey", val as string),
          }}
        />
      );
    }

    return undefined;
  }, [activeStep, fields, profile, fieldValueSetter]);

  const handleOnSubmit = useCallback(
    async (formData: IStreamCreationFormProps) => {
      setLoading(true);
      const requestData: CreateWebinar = {
        topic_title: formData.topic,
        topic_image: formData.image,
        description: formData.description,
        start: formData.dateAndTime.toFormat(
          DateTime.DEFAULT_DATETIME_INPUT_FORMAT
        ),
        categories: [formData.category?.pk],
        rtmp_link: formData.rtmpLink
          ? `${formData.rtmpLink}/${formData.rtmpKey}`
          : undefined,
      };

      const [res, err] = await CreatorApiClient().postStream(requestData);
      if (err) {
        if (err.response && err.response.data) {
          const error = err.response.data as BaseApiError;
          if (
            error.error_code === "groupStartDateTimeNotInFuture" ||
            error.error_code === "groupStartLessThan15Minutes"
          ) {
            setFormError("* Error in stream time & date.");
            fieldErrorSetter("dateAndTime", error.error_message);
          }
        }
      }

      if (res) {
        clearForm();
        if (postSubmit) {
          postSubmit(res);
        }
      }

      setLoading(false);
    },
    [fieldErrorSetter, clearForm, postSubmit]
  );

  const onClickSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    const data = getValidatedData();
    if (data !== false) {
      setFormError(null);
      handleOnSubmit(data);
    } else {
      setFormError("* Required fields cannot be empty.");
    }
  };

  return (
    <Form
      as="form"
      h="100%"
      gridAutoFlow="row"
      gridTemplateRows="1fr max-content"
      gridTemplateColumns="minmax(0, 1fr)"
      onSubmit={onClickSubmit}
    >
      <CustomBox h="90%" pt={space.xs} pl={24} pr={space.xxs} overflowY="auto">
        {formToRender}
      </CustomBox>
      <Flex
        py={space.xxxs}
        pl={24}
        pr={space.xxs}
        justifyContent="space-between"
        alignItems="center"
        borderTop={`1px solid ${colors.primaryLight}`}
      >
        {activeStep === StreamCreationSteps.GetStarted && (
          <Flex
            p={space.xxxs}
            bg={colors.primaryLight}
            gridGap={space.xxxxxs}
            borderRadius={2}
            alignItems="center"
          >
            <Icon
              icon="Info"
              size={16}
              color={colors.textPrimary}
              fill={true}
            />
            <Text textStyle="captionLarge" lineHeight="1.6rem">
              It takes less than 2 minutes to set up your stream in 4 easy
              steps.
            </Text>
          </Flex>
        )}

        {formError && activeStep === StreamCreationSteps.OtherSettings && (
          <Box py={space.xxxxxs}>
            <Text textStyle="error" color={colors.error}>
              {formError}
            </Text>
          </Box>
        )}

        <Box />

        <Flex gridGap={space.xxs}>
          {activeStep !== 0 && (
            <Button
              variant="condensed-dark"
              label="Back"
              prefixElement={<Icon icon="ChevronLeft" size={16} />}
              onClick={(e) => previousPage(e)}
            />
          )}

          {activeStep !== STREAM_CREATION_PAGES.length - 1 && (
            <Button
              label="Next"
              suffixElement={<Icon icon="ChevronRight" size={16} />}
              onClick={(e) => nextPage(e)}
            />
          )}

          {activeStep === STREAM_CREATION_PAGES.length - 1 && (
            <Button
              type="submit"
              label="Submit and Create Stream"
              suffixElement={loading && <Spinner size={24} />}
              disabled={loading}
            />
          )}
        </Flex>
      </Flex>
    </Form>
  );
}
