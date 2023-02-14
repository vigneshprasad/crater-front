import { forwardRef } from "react";
import { useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import styled, { useTheme } from "styled-components";

import { Dialog, Text, DialogProps, Box, Grid } from "../../atoms";

const StyledDialog = styled(Dialog)<DialogProps>`
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => `${theme.colors.primaryDark}`};
  max-width: 60vw;
  border-radius: 4px;
  width: 100%;

  &[open] > ${Box} {
    margin: auto auto;
    animation: show 300ms ease-in normal;
  }

  &[open] {
    display: grid;
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(100%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    max-width: calc(100vw - 64px);
    width: 100%;
  }
`;

const InfoDialogCrater = forwardRef<HTMLDialogElement & HTMLDivElement>(
  (_, ref) => {
    const { space } = useTheme();
    const dialogRef = useRef<HTMLDialogElement & HTMLDivElement>(null);
    const videoElementRef = useRef<HTMLVideoElement>(null);

    const closeDialog = (): void => {
      dialogRef.current?.close();
      videoElementRef.current?.pause();
    };

    const handleDialogAutoCLose = (
      event: React.MouseEvent<HTMLDialogElement & HTMLDivElement>
    ): void => {
      if (event.currentTarget.tagName === "DIALOG") {
        closeDialog();
      }
    };

    return (
      <StyledDialog
        ref={mergeRefs([ref, dialogRef])}
        onClick={handleDialogAutoCLose}
      >
        <Box onClick={(event) => event.stopPropagation()}>
          <Box
            ref={videoElementRef}
            as="video"
            src="/videos/mp4_crater_rewind.mp4"
            aspectRatio="16 / 7"
            controls
            width="100%"
            background="#000000"
          />
          <Grid gridTemplateColumns={["1fr", "1fr 2fr"]} p={space.xxs}>
            <Box>
              <Text textStyle="headline5">A letter from the founders</Text>
              <Text>12th Feb, 2023</Text>
            </Box>
            <Box position="relative" minHeight="40vh">
              <Box
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                overflowY="auto"
              >
                <Text pb={space.xxs}>Hey Crater Community,</Text>
                <Text pb={space.xxs}>
                  We want to share some important updates regarding the future
                  of our platform. We know that many of you have invested time,
                  energy, and creativity into Crater. You are the heart of
                  Crater and we want to make sure you are in the loop on what is
                  going on.
                  <br />
                  <br />
                  As you may already know, the world of live streaming is
                  constantly evolving, and we were always working hard to bring
                  you the best possible experience. Moreover, as many of you
                  know that the startup ecosystem is going through some hard
                  times. Crater is one of the startups that has been impacted by
                  that. Due to various financial & personal circumstances, we
                  have had to make the difficult decision to disable streaming
                  on Crater.
                  <br />
                  While this may come as a disappointment, we want to assure you
                  that all past streams will still be available for you to watch
                  and download until April 1st. This means that you will have
                  the opportunity to relive your most memorable moments and
                  share them with others via other platforms. Additionally, the
                  LEARN tokens will also be transferred to learntokens.org.
                  <br />
                  <br />
                  We just want to take a moment to say a big THANK YOU for being
                  a part of our community. Your passion for creating and
                  consuming live streams has been amazing and we are truly
                  grateful for everything you have brought to the platform. You
                  all helped make Crater what it is today and we are so lucky to
                  have worked with you all. To recap this journey we put
                  together a short video, linked{" "}
                  <a href="https://www.youtube.com/watch?v=ntYwmDAgeAs">
                    here
                  </a>{" "}
                  . While despite our best efforts, it does not capture all the
                  creators on Crater, it gives a glimpse of the work we were
                  able to do together.
                  <br />
                  <br />
                  We know this change may bring up some questions and we are
                  here to help. If you need any info or have any questions, feel
                  free to reach out to the founders at vivan@crater.club &
                  vignesh@crater.club. We promise to make this transition as
                  smooth as possible and are always here to help.
                  <br />
                  <br />
                  In conclusion, thank you again for being a part of the Crater
                  family. We have had an amazing journey together and we cannot
                  wait to see what the future holds. Keep creating and keep
                  learning, we will see you all soon.
                  <br />
                  <br />
                  Best, <br />
                  Vivan & Vignesh
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
      </StyledDialog>
    );
  }
);

InfoDialogCrater.displayName = "InfoDialogCrater";

export default InfoDialogCrater;
