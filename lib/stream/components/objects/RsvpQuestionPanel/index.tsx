import { useState } from "react";
import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  BottomSheet,
  Box,
  BoxProps,
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
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
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

const QuestionBox = styled(Box)<BoxProps>`
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.xxs}px;

  ::-webkit-scrollbar {
    width: 6px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    border-radius: 4px;
  }
`;

export default function RsvpQuestionPanel({
  questions,
  loading,
  postQuestion,
  postQuestionUpvote,
}: IProps): JSX.Element | null {
  const { space, colors, breakpoints } = useTheme();
  const { openModal } = useAuthModal();
  const { user } = useAuth();
  const [showQuestionSheet, setShowQuestionSheet] = useState(false);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const questionPanelHeading = (
    <>
      <Box
        px={space.xxxs}
        py={[space.xxxxs, space.xxxs]}
        bg={colors.primaryDark}
      >
        <Text pb={space.xxxxxs} textStyle="body" display={["none", "block"]}>
          Ask a Question
        </Text>
        <Text
          textStyle="small"
          fontWeight={500}
          color={colors.accentLight}
          display={["none", "block"]}
        >
          Got a question for the creator? Post them here.
        </Text>
        <Text
          textStyle="small"
          fontWeight={500}
          color="#C4C4C4"
          display={["block", "none"]}
        >
          Our creators are always working on new content for you. You can send
          them a question about their stream here.
        </Text>
      </Box>

      <Box p={space.xxxs} bg="#5971D3">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
    </>
  );

  const questionPanelMain = loading ? (
    <Shimmer w="100%" h={[300, "100%"]} />
  ) : (
    <QuestionBox maxHeight={[300, 450]} bg={colors.primaryLight}>
      {questions && questions.length > 0 ? (
        questions.map((question) => (
          <Box pb={space.xxs} key={question.id}>
            <Text textStyle="body" color="#C9F4C6">
              {question.sender_detail.name}
            </Text>
            <Flex
              pt={space.xxxxxs}
              flexDirection={["column", "row"]}
              gridGap={[10, 20]}
              justifyContent="space-between"
            >
              <Text textStyle="small">{question.question}</Text>
              <Flex flexDirection="row" gridGap={space.xxxxs}>
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
                      color: question.upvote ? colors.accentLight : "#C4C4C4",
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
        <Flex flexDirection="column" alignItems="center">
          <Box w={190} h={190}>
            <Image
              src="/images/img_empty_state_questions.png"
              alt="Question"
              layout="fill"
            />
          </Box>
          <Text textStyle="body" color="#C4C4C4" textAlign="center">
            Start a conversation with the creator by asking a question here
          </Text>
        </Flex>
      )}
    </QuestionBox>
  );

  const questionPanelForm = user ? (
    <Box px={space.xxxs} pt={space.xs} pb={space.xxxs} bg={colors.primaryDark}>
      <QuestionForm postQuestion={postQuestion} />
    </Box>
  ) : (
    <Box p={space.xs} bg={[colors.primaryLight, colors.primaryDark]}>
      <Text textStyle="body">
        <SpanButton color={colors.accentLight} onClick={() => openModal()}>
          Login
        </SpanButton>{" "}
        to post questions on this stream.
      </Text>
    </Box>
  );

  const questionPanel = (
    <Grid gridTemplateRows="min-content min-content 1fr min-content" h="100%">
      {questionPanelHeading}

      {questionPanelMain}

      {questionPanelForm}
    </Grid>
  );

  if (isMobile === undefined) return null;

  if (isMobile) {
    return (
      <>
        <Flex
          px={28}
          py={space.xxxs}
          justifyContent="center"
          alignItems="center"
          gridGap={6}
          bg={colors.primaryDark}
          borderRight={`1px solid ${colors.primaryLight}`}
          onClick={() => setShowQuestionSheet(true)}
        >
          <Icon
            icon="QuestionMark"
            size={20}
            color={colors.white[0]}
            fill={true}
          />
          <Text textStyle="small" fontWeight={500}>
            Ask a question
          </Text>
        </Flex>

        <BottomSheet
          px={0}
          heading="Ask a question"
          bg={colors.primaryDark}
          visible={showQuestionSheet}
          boxProps={{
            px: space.xxxs,
            pt: space.xxxs,
            pb: 0,
            bg: colors.primaryDark,
          }}
          onClose={() => {
            setShowQuestionSheet(false);
          }}
        >
          {questionPanel}
        </BottomSheet>
      </>
    );
  }

  return <Box bg={colors.primaryLight}>{questionPanel}</Box>;
}
