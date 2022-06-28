import { forwardRef } from "react";
import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Box,
  Flex,
  Icon,
  Image,
  Shimmer,
  Span,
  SpanProps,
  Text,
} from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import { Webinar } from "@/community/types/community";
import { StreamQuestion } from "@/stream/types/stream";

import QuestionForm from "../../forms/QuestionForm";

const SpanButton = styled(Span)<SpanProps>`
  cursor: pointer;
`;

interface IProps {
  stream: Webinar;
  questions?: StreamQuestion[];
  loading: boolean;
  nextPage: boolean;
  loadMoreQuestions: () => void;
  postQuestion: (question: string) => Promise<void>;
  postQuestionUpvote: (question: number) => void;
}

const PastStreamForum = forwardRef<HTMLDivElement, IProps>(
  (
    {
      stream,
      questions,
      loading,
      nextPage,
      loadMoreQuestions,
      postQuestion,
      postQuestionUpvote,
    },
    ref
  ) => {
    const { space, colors, fonts } = useTheme();
    const { user } = useAuth();
    const { openModal } = useAuthModal();

    const { host } = stream;

    const questionPanelMain = loading ? (
      Array(2)
        .fill("")
        .map((_, index) => (
          <Flex pb={28} key={index} flexDirection="column" gridGap={space.xxs}>
            <Shimmer w={100} h={19} />
            <Shimmer pt={space.xxxs} w="70%" h={40} />
            <Shimmer pt={space.xxxs} w={40} h={20} />
          </Flex>
        ))
    ) : (
      <Box>
        {questions && questions.length > 0 ? (
          questions.map((question) => (
            <Box w="95%" pb={28} key={question.id}>
              <Text
                textStyle="body"
                color={
                  question.sender === host ? colors.accentLight : "#C9F4C6"
                }
              >
                {question.sender_detail.name.trim() || "Anonymous"}
              </Text>
              <Flex
                pt={space.xxxs}
                flexDirection="column"
                gridGap={[10, space.xxxs]}
                justifyContent="space-between"
              >
                <Text textStyle="body" fontWeight={500} lineHeight="2.1rem">
                  {question.question}
                </Text>
                <Flex
                  pl={space.xxxxxs}
                  flexDirection="row"
                  gridGap={space.xxxxs}
                >
                  {!user || user?.pk === question.sender ? (
                    <Icon py={0} icon="Upvote" color="#C4C4C4" size={16} />
                  ) : (
                    <IconButton
                      w={16}
                      h={16}
                      icon="Upvote"
                      alignSelf="start"
                      iconProps={{
                        py: 0,
                        size: 16,
                        color: question.upvote ? "#6AD361" : "#C4C4C4",
                        fill: true,
                      }}
                      onClick={() => postQuestionUpvote(question.id)}
                    />
                  )}
                  <Text textStyle="small" color="#C4C4C4">
                    {question.upvotes}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))
        ) : (
          <Text textStyle="body" color="#C4C4C4" textAlign="center">
            Be the first to drop your comments, questions or share your
            excitement here.
          </Text>
        )}

        {nextPage && (
          <Button
            variant="dark-flat"
            w="90%"
            h={40}
            label="Load More Interactions"
            textProps={{ textStyle: "body", fontWeight: 500 }}
            display={["none", "flex"]}
            justifyContent="center"
            alignItems="center"
            gridGap={space.xxxs}
            suffixElement={<Icon icon="ChevronDown" size={20} />}
            onClick={loadMoreQuestions}
          />
        )}
      </Box>
    );

    return (
      <Box pt={space.xxxs} w="90%" ref={ref}>
        <Text
          pb={space.xxxxxs}
          textStyle="bodyLarge"
          fontFamily={fonts.heading}
          fontWeight={400}
          display={["none", "block"]}
        >
          Forum
        </Text>
        <Text
          textStyle="body"
          fontWeight={500}
          lineHeight="2.1rem"
          color={colors.textTertiary}
        >
          Our creators are always working on new content for you. You can drop
          your comments, questions or share your excitement here.
        </Text>

        <Box py={space.xs}>
          <Text textStyle="label" color={colors.accentLight}>
            You
          </Text>

          {user ? (
            <Box w="75%" pt={space.xxs}>
              <QuestionForm
                postQuestion={postQuestion}
                inputContainerProps={{ bg: colors.primaryBackground }}
              />
            </Box>
          ) : (
            <Box w="75%" mt={space.xxs} py={space.xxxs} bg={colors.primaryDark}>
              <Text textStyle="body" textAlign="center">
                <SpanButton
                  color={colors.accentLight}
                  onClick={() => openModal()}
                >
                  Login
                </SpanButton>{" "}
                to post questions on this stream.
              </Text>
            </Box>
          )}
        </Box>

        <Box w="75%" pb={space.xxs}>
          {questionPanelMain}
        </Box>
      </Box>
    );
  }
);

PastStreamForum.displayName = "PastStreamForum";

PastStreamForum.defaultProps = {
  questions: undefined,
};

export default PastStreamForum;
