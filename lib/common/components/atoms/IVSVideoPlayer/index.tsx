import {
  create,
  isPlayerSupported,
  PlayerEventType,
  MediaPlayer,
} from "amazon-ivs-player";
import { forwardRef, useEffect, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { AnimatedBox, AnimatedBoxProps } from "../Animated";
import { Box, BoxProps } from "../System";

export type IVSVideoPlayerProps = BoxProps &
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    containerProps?: AnimatedBoxProps;
    on404Error: () => void;
  };

const IVSVideoPlayer = forwardRef<HTMLVideoElement, IVSVideoPlayerProps>(
  ({ src, containerProps, on404Error, ...rest }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<MediaPlayer>();

    useEffect(() => {
      if (isPlayerSupported) {
        if (playerRef.current) {
          playerRef.current.delete();
          playerRef.current = undefined;
        }
        try {
          const player = create({
            wasmBinary:
              "https://unpkg.com/amazon-ivs-player@1.11.0/dist/assets/amazon-ivs-wasmworker.min.wasm",
            wasmWorker:
              "https://unpkg.com/amazon-ivs-player@1.11.0/dist/assets/amazon-ivs-wasmworker.min.js",
          });
          playerRef.current = player;

          if (src && videoRef.current) {
            videoRef.current && player.attachHTMLVideoElement(videoRef.current);

            player.addEventListener(PlayerEventType.INITIALIZED, () => {
              console.log("INITIALIZED");
            });

            player.addEventListener(PlayerEventType.ERROR, (payload) => {
              if (payload.code === 404) {
                on404Error && on404Error();
              }
            });

            player.setAutoplay(true);
            player.load(src);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, [src, on404Error]);

    return (
      <AnimatedBox {...containerProps} position="relative">
        <Box
          {...rest}
          h="100%"
          w="100%"
          ref={mergeRefs([videoRef, ref])}
          as="video"
          playsInline
        />
      </AnimatedBox>
    );
  }
);

IVSVideoPlayer.displayName = "IVSVideoPlayer";

export default IVSVideoPlayer;
