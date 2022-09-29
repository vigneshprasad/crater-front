import STATIC_IMAGES from "public/images";
import { forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import useSWR from "swr";

import {
  AnimatedBox,
  AnimatedBoxProps,
  Shimmer,
} from "@/common/components/atoms";
import HLSVideoPlayer from "@/common/components/atoms/HLSVideoPlayer";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { DyteLiveStream } from "@/dyte/types/dyte";

type IProps = AnimatedBoxProps & {
  streamId: number;
};

const StreamHLSPlayer = forwardRef<HTMLVideoElement, IProps>(
  ({ streamId, ...rest }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { data: liveStream, isValidating } = useSWR<DyteLiveStream>(
      API_URL_CONSTANTS.integrations.dyte.getActiveLiveStreamForMeeting(
        streamId
      )
    );

    const STARTING_IMAGES = [
      STATIC_IMAGES.ImageStreamStarting_1,
      STATIC_IMAGES.ImageStreamStarting_2,
    ];

    return (
      <AnimatedBox {...rest}>
        {(() => {
          if (isValidating && !liveStream) {
            return <Shimmer h="100%" w="100%" />;
          }

          const random = streamId % 2;

          return (
            <HLSVideoPlayer
              ref={mergeRefs([videoRef, ref])}
              poster={STARTING_IMAGES[random].src}
              h="100%"
              w="100%"
              controls
              src={liveStream?.playback_url}
            />
          );
        })()}
      </AnimatedBox>
    );
  }
);

StreamHLSPlayer.displayName = "StreamHLSPlayer";

export default StreamHLSPlayer;
