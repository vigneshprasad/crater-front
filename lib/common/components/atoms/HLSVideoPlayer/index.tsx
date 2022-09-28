import Hls from "hls.js";
import { useRef, useEffect, forwardRef, useCallback } from "react";
import { mergeRefs } from "react-merge-refs";

import { Box, BoxProps } from "../System";

export type HLSVideoPlayerProps = BoxProps &
  React.VideoHTMLAttributes<HTMLVideoElement>;

const HLSVideoPlayer = forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(
  ({ src, autoPlay, ...rest }, ref) => {
    const playerRef = useRef<HTMLVideoElement>(null);
    const playVideo = useCallback(() => {
      if (playerRef.current) {
        const promise = playerRef.current.play();
        console.log(promise);
        if (promise !== undefined) {
          promise.catch((err) => {
            console.log(err);
          });
        }
      }
    }, [playerRef]);
    useEffect(() => {
      if (playerRef.current && src) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(playerRef.current);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) {
              playVideo();
            }
          });
        } else if (
          playerRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          playerRef.current.src = src;
          if (autoPlay) {
            playVideo();
          }
        }
      }
    }, [playerRef, src, autoPlay, playVideo]);
    return (
      <Box
        ref={mergeRefs([playerRef, ref])}
        as="video"
        autoPlay={false}
        {...rest}
      />
    );
  }
);

HLSVideoPlayer.displayName = "HLSVideoPlayer";

export default HLSVideoPlayer;
