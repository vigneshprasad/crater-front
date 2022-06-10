import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Shimmer,
  Span,
  SpanProps,
  Text,
} from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import { StreamQuestion } from "@/stream/types/stream";

import QuestionForm from "../../forms/QuestionForm";

const SpanButton = styled(Span)<SpanProps>`
  cursor: pointer;
`;

interface IProps {
  questions?: StreamQuestion[];
  loading: boolean;
  postQuestion: (question: string) => Promise<void>;
  postQuestionUpvote: (question: number) => void;
}

export default function RsvpQuestionPanel({
  questions,
  loading,
  postQuestion,
  postQuestionUpvote,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { openModal } = useAuthModal();
  const { user } = useAuth();

  return (
    <Box bg={colors.primaryLight}>
      <Grid gridTemplateRows="min-content min-content 1fr min-content" h="100%">
        <Box p={space.xxxs} bg={colors.primaryDark}>
          <Text pb={space.xxxxxs} textStyle="body">
            Ask a Question
          </Text>
          <Text textStyle="small" fontWeight={500} color={colors.accentLight}>
            Got a question for the creator? Post them here.
          </Text>
        </Box>

        <Box p={space.xxxs} bg="#5971D3">
          <Flex flexDirection="row" justifyContent="space-between">
            <Text textStyle="body" w="80%">
              Our creators will respond to all your questions on the stream.
            </Text>
            <Box
              w={24}
              h={24}
              borderRadius="50%"
              bg={colors.white[0]}
              position="relative"
            >
              <Icon
                position="absolute"
                icon="Pin"
                w={13}
                h={13}
                left={5}
                top={5}
              />
            </Box>
          </Flex>
        </Box>

        {loading ? (
          <Shimmer w="100%" h="100%" />
        ) : (
          <Box p={space.xxs} overflowY="auto">
            {questions && questions.length > 0 ? (
              questions.map((question) => (
                <Box pb={space.xxs} key={question.id}>
                  <Text textStyle="body" color="#C9F4C6">
                    {question.sender_detail.name}
                  </Text>
                  <Flex
                    pt={space.xxxxxs}
                    flexDirection="row"
                    gridGap={20}
                    justifyContent="space-between"
                  >
                    <Text textStyle="small">{question.question}</Text>
                    <Flex flexDirection="row" gridGap={space.xxxxs}>
                      {user?.pk === question.sender ? (
                        <Icon
                          w={10}
                          h={18}
                          py={0}
                          icon="Upvote"
                          color="#C4C4C4"
                          size={10}
                        />
                      ) : question.upvote ? (
                        <IconButton
                          w={10}
                          h={18}
                          icon="Upvote"
                          alignSelf="start"
                          iconProps={{
                            py: 0,
                            size: 10,
                            color: "accentLight",
                          }}
                          onClick={() => postQuestionUpvote(question.id)}
                        />
                      ) : (
                        <IconButton
                          w={10}
                          h={18}
                          icon="Upvote"
                          alignSelf="start"
                          iconProps={{
                            py: 0,
                            size: 10,
                            color: "#C4C4C4",
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
              <Flex flexDirection="column" alignItems="center">
                <Box w={190} h={190}>
                  <Image
                    src="/images/img_empty_state_questions.png"
                    alt="Question"
                    layout="fill"
                  />
                </Box>
                <Text textStyle="body" color="#C4C4C4" textAlign="center">
                  Start a conversation with the creator by asking a question
                  here
                </Text>
              </Flex>
            )}
          </Box>
        )}

        {user ? (
          <Box
            px={space.xxxs}
            pt={space.xs}
            pb={space.xxxs}
            bg={colors.primaryDark}
          >
            <QuestionForm postQuestion={postQuestion} />
          </Box>
        ) : (
          <Box p={space.xs} bg={colors.primaryDark}>
            <Text textStyle="body">
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
      </Grid>
    </Box>
  );
}
