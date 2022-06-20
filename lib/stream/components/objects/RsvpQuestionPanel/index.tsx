import { useState } from "react";
import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
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
  host: string;
  postQuestion: (question: string) => Promise<void>;
  postQuestionUpvote: (question: number) => void;
  autoRsvp?: () => void;
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
  host,
  postQuestion,
  postQuestionUpvote,
  autoRsvp,
}: IProps): JSX.Element | null {
  const { space, colors, breakpoints, fonts } = useTheme();
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
        <Text
          pb={space.xxxxxs}
          textStyle="body"
          fontFamily={fonts.heading}
          display={["none", "block"]}
        >
          Forum
        </Text>
        <Text textStyle="small" fontWeight={500} color={colors.accentLight}>
          A way to share whats on your mind prior to the stream starting.
        </Text>
      </Box>

      <Box p={space.xxxs} bg="#5971D3">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text textStyle="body" w="90%">
            The creator will address the comments during the livestream, which
            you can join by clicking the RSVP / Join button below.
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
    <Shimmer w="100%" h={["calc(100vh - 500px)", "calc(100vh - 400px)"]} />
  ) : (
    <QuestionBox
      minHeight="100%"
      maxHeight={["calc(100vh - 500px)", "calc(100vh - 400px)"]}
      bg={colors.primaryLight}
    >
      {questions && questions.length > 0 ? (
        questions.map((question) => (
          <Box pb={space.xxs} key={question.id}>
            <Text
              textStyle="body"
              color={question.sender === host ? colors.accentLight : "#C9F4C6"}
            >
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
        <Flex flexDirection="column" alignItems="center">
          <Box w={190} h={190}>
            <Image
              src="/images/img_empty_state_questions.png"
              alt="Question"
              layout="fill"
            />
          </Box>
          <Text textStyle="body" color="#C4C4C4" textAlign="center">
            Prior to the stream you can drop your comments, questions or share
            your excitement here.
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
    <Box px={space.xs} py={space.s} bg={colors.primaryDark}>
      <Text textStyle="body" textAlign="center">
        <SpanButton
          color={colors.accentLight}
          onClick={() => autoRsvp && autoRsvp()}
        >
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
            Forum
          </Text>
        </Flex>

        <BottomSheet
          px={0}
          heading="Forum"
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
