import STATIC_IMAGES from "public/images";
import { forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import {
  AnimatedBox,
  AnimatedBoxProps,
  Box,
  Flex,
} from "@/common/components/atoms";
import HLSVideoPlayer from "@/common/components/atoms/HLSVideoPlayer";
import { IconButton } from "@/common/components/atoms/v2";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { DyteLiveStream } from "@/dyte/types/dyte";

import VideoSeekbar from "../../atoms/VideoSeekbar";

type IProps = AnimatedBoxProps & {
  streamId: number;
};

const ControlsContainer = styled(Box)`
  transition: all 200ms ease-in-out;
  transform: translate(0, 70px);
  opacity: 0;
`;

const Container = styled(AnimatedBox)`
  overflow: hidden;

  &:hover ${ControlsContainer} {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const StreamHLSPlayer = forwardRef<HTMLVideoElement, IProps>(
  ({ streamId, ...rest }, ref) => {
    const { space } = useTheme();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { data: liveStream } = useSWR<DyteLiveStream>(
      API_URL_CONSTANTS.integrations.dyte.getActiveLiveStreamForMeeting(
        streamId
      )
    );

    const STARTING_IMAGES = [
      STATIC_IMAGES.ImageStreamStarting_1,
      STATIC_IMAGES.ImageStreamStarting_2,
    ];

    const random = streamId % 2;

    return (
      <Container {...rest} position="relative">
        <HLSVideoPlayer
          ref={mergeRefs([videoRef, ref])}
          poster={STARTING_IMAGES[random].src}
          h="100%"
          w="100%"
          controls={false}
          src={liveStream?.playback_url}
        />
        <ControlsContainer
          position="absolute"
          bottom={0}
          right={0}
          left={0}
          background="linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))"
        >
          <VideoSeekbar />
          <Flex pb={space.xxxs}>
            <IconButton buttonStyle="flat-video" icon="Play" />
            <IconButton buttonStyle="flat-video" icon="VolumeUp" />
          </Flex>
        </ControlsContainer>
      </Container>
    );
  }
);

StreamHLSPlayer.displayName = "StreamHLSPlayer";

export default StreamHLSPlayer;
