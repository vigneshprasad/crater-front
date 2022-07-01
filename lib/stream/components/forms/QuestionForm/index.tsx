import { SyntheticEvent, useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";

import {
  Box,
  Flex,
  FlexProps,
  Form,
  InputProps,
  Spinner,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";

const InputContainer = styled(Flex)<FlexProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};
  padding: 8px 0px;
  align-items: center;

  &:focus-within {
    border-bottom: 1px solid ${({ theme }) => theme.colors.accentLight};
  }
`;

const StyledInput = styled.input<InputProps & { placeholderColor?: string }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white[0]};
  background: transparent;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
  width: 100%;

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ placeholderColor, theme }) =>
      placeholderColor ? placeholderColor : theme.colors.textPlaceholder};
  }
`;

type QuestionFormArgs = {
  question: string;
};

interface IProps {
  inputContainerProps?: FlexProps;
  postQuestion: (question: string) => Promise<void>;
}

export default function QuestionForm({
  inputContainerProps,
  postQuestion,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();
  const [loading, setLoading] = useState(false);
  const { fields, fieldValueSetter, getValidatedData, clearForm } =
    useForm<QuestionFormArgs>({
      fields: {
        question: {
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "Please enter a question.",
            },
          ],
        },
      },
    });

  const handleOnSubmit = useCallback(
    async ({ question }: QuestionFormArgs) => {
      if (postQuestion) {
        setLoading(true);
        await postQuestion(question);
        clearForm();
        setLoading(false);
      }
    },
    [postQuestion, clearForm]
  );

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    const formData = getValidatedData();

    if (formData) {
      handleOnSubmit(formData);
    }
  };

  return (
    <Form
      as="form"
      display="grid"
      gridAutoFlow={["column", "row"]}
      gridGap={space.xxxs}
      onSubmit={handleFormSubmit}
    >
      <Box>
        <InputContainer bg={colors.primaryDark} {...inputContainerProps}>
          <StyledInput
            placeholder="Post a question..."
            value={fields.question.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              fieldValueSetter("question", e.currentTarget.value)
            }
          />
        </InputContainer>
        {fields.question.errors[0] && (
          <Text
            px={space.xxxxs}
            py={space.xxxxs}
            color={colors.error}
            textStyle="error"
          >
            {fields.question.errors[0]}
          </Text>
        )}
      </Box>
      <Button
        justifySelf="end"
        variant="text"
        label="Post"
        textProps={{
          fontSize: "1.4rem",
          fontWeight: 600,
          opacity: fields.question.value ? 1 : 0.4,
          textTransform: "uppercase",
        }}
        type="submit"
        suffixElement={
          loading ? (
            <Spinner size={18} strokeColor={colors.accentLight} />
          ) : undefined
        }
        disabled={loading}
      />
    </Form>
  );
}
