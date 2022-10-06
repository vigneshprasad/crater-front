import Hls, { ErrorData, Events } from "hls.js";
import { useRef, useEffect, forwardRef, useCallback, useState } from "react";
import { mergeRefs } from "react-merge-refs";
import styled from "styled-components";

import { AnimatedBox, AnimatedBoxProps } from "../Animated";
import IconButton from "../IconButton";
import { Box, BoxProps, Grid } from "../System";

export type HLSVideoPlayerProps = BoxProps &
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    containerProps?: AnimatedBoxProps;
    onHlsError?: (error: ErrorData) => void;
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

const HLSVideoPlayer = forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(
  ({ src, autoPlay, containerProps, onHlsError, ...rest }, ref) => {
    const hls = useRef<Hls>();
    const playerRef = useRef<HTMLVideoElement>(null);
    const [showPlay, setShowPlay] = useState(false);

    const playVideo = useCallback(() => {
      if (playerRef.current) {
        const promise = playerRef.current.play();
        if (promise !== undefined) {
          promise.catch((err) => {
            console.log(err);
            setShowPlay(true);
          });
        }
      }
    }, [playerRef]);

    const handleHlsError = useCallback(
      (error: Events.ERROR, data: ErrorData) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.log("fatal network error encountered, try to recover");
              hls.current?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("fatal media error encountered, try to recover");
              hls.current?.recoverMediaError();
              break;
            default:
              // cannot recover
              hls.current?.destroy();
              break;
          }
        }
        onHlsError && onHlsError(data);
      },
      [onHlsError]
    );

    useEffect(() => {
      const videoElement = playerRef.current;

      if (videoElement && src && !hls.current) {
        if (Hls.isSupported()) {
          hls.current = new Hls();
          hls.current.attachMedia(videoElement);

          hls.current.on(Hls.Events.ERROR, handleHlsError);

          hls.current.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log("Media attached");
            hls.current?.loadSource(src);
            hls.current?.on(Hls.Events.MANIFEST_PARSED, () => {
              if (autoPlay) {
                playVideo();
              }
            });
          });
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = src;

          if (autoPlay) {
            playVideo();
          }
        }
      }

      return () => {
        hls.current?.removeAllListeners();
      };
    }, [playerRef, src, autoPlay, playVideo, handleHlsError, hls]);

    return (
      <Container {...containerProps} position="relative">
        <Box
          h="100%"
          w="100%"
          ref={mergeRefs([playerRef, ref])}
          as="video"
          loop={true}
          {...rest}
        />
        {showPlay && (
          <Grid
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            onClick={() => {
              playerRef.current?.play();
              setShowPlay(false);
            }}
          >
            <IconButton m="auto auto" icon="Play" />
          </Grid>
        )}
      </Container>
    );
  }
);

HLSVideoPlayer.displayName = "HLSVideoPlayer";

export default HLSVideoPlayer;
