import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Span,
  SpanProps,
  Text,
} from "@/common/components/atoms";

const SpanButton = styled(Span)<SpanProps>`
  cursor: pointer;
`;

export default function RsvpQuestionPanel(): JSX.Element {
  const { space, colors } = useTheme();
  const { openModal } = useAuthModal();
  const { user } = useAuth();

  return (
    <Box bg={colors.primaryLight}>
      <Grid gridTemplateRows="min-content min-content 1fr min-content" h="100%">
        {user ? (
          <Box />
        ) : (
          <>
            <Box p={space.xxxs} bg={colors.primaryDark}>
              <Text pb={space.xxxxxs} textStyle="body">
                Ask a Question
              </Text>
              <Text
                textStyle="small"
                fontWeight={500}
                color={colors.accentLight}
              >
                Got a question for the creator? Post them here.
              </Text>
            </Box>

            <Box p={space.xxxs} bg="#5971D3">
              <Flex flexDirection="row" justifyContent="space-between">
                <Text textStyle="body" w="80%">
                  Our creators will respond to all your questions on the stream.
                </Text>
                <Box w={24} h={24} borderRadius="50%" bg={colors.white[0]}>
                  <Icon icon="Pin" />
                </Box>
              </Flex>
            </Box>

            <Box p={space.xxs}>
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
            </Box>

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
          </>
        )}
      </Grid>
    </Box>
  );
}
