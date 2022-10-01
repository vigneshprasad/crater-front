import { ErrorData, ErrorTypes } from "hls.js";
import STATIC_IMAGES from "public/images";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import useSWR from "swr";

import HLSVideoPlayer, {
  HLSVideoPlayerProps,
} from "@/common/components/atoms/HLSVideoPlayer";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DyteApiClient from "@/dyte/api";
import { DyteLiveStream, DyteLiveStreamStatus } from "@/dyte/types/dyte";

type IProps = HLSVideoPlayerProps & {
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

    const pauseVideo = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, [videoRef]);

    const STARTING_IMAGES = [
      STATIC_IMAGES.ImageStreamStarting_1,
      STATIC_IMAGES.ImageStreamStarting_2,
    ];

    const random = streamId % 2;

    const handleHlsError = (data: ErrorData): void => {
      if (data.type === ErrorTypes.NETWORK_ERROR) {
        if (liveStream) {
          DyteApiClient().updateDyteLivestream(liveStream.id, {
            status: DyteLiveStreamStatus.OFFLINE,
          });
        }
      }
    };

    useEffect(() => {
      if (isValidating && !liveStream) pauseVideo();
    }, [isValidating, pauseVideo, liveStream]);

    return (
      <HLSVideoPlayer
        ref={mergeRefs([videoRef, ref])}
        poster={STARTING_IMAGES[random].src}
        src={liveStream?.playback_url}
        onHlsError={handleHlsError}
        {...rest}
      />
    );
  }
);

StreamHLSPlayer.displayName = "StreamHLSPlayer";

export default StreamHLSPlayer;
