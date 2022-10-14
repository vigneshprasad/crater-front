import {
  create,
  isPlayerSupported,
  PlayerEventType,
  MediaPlayer,
  PlayerError,
} from "amazon-ivs-player";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { mergeRefs } from "react-merge-refs";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, AnimatedBoxProps } from "../Animated";
import { Icon } from "../Icon";
import RangeInput from "../RangeInput";
import { Box, BoxProps, Grid, Flex, Text } from "../System";
import { IconButton } from "../v2";

export type IVSVideoPlayerProps = BoxProps &
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    containerProps?: AnimatedBoxProps;
    on404Error?: () => void;
  };

const ControlsContainer = styled(Grid)`
  transition: all 200ms ease-in-out;
  transform: translate(0, 70px);
  opacity: 0;
`;

const Container = styled(AnimatedBox)`
  overflow: hidden;

  &:hover ${ControlsContainer}, &:active ${ControlsContainer} {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const IVSVideoPlayer = forwardRef<HTMLVideoElement, IVSVideoPlayerProps>(
  (
    {
      src,
      containerProps,
      on404Error,
      autoPlay,
      muted: mutedProp,
      controls,
      ...rest
    },
    ref
  ) => {
    const { space, colors } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<MediaPlayer>();
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const [initialized, setInitialized] = useState(false);

    const handlePlayerIntialized = useCallback((): void => {
      setInitialized(true);
    }, []);

    const handleIVSError = useCallback(
      (payload: PlayerError): void => {
        if (payload.code === 404) {
          on404Error && on404Error();
        }
      },
      [on404Error]
    );

    useEffect(() => {
      if (mutedProp === undefined) return;
      if (!initialized) return;
      if (mutedProp !== muted) {
        setMuted(mutedProp);
      }
    }, [mutedProp, setMuted, muted, initialized]);

    const intializePlayer = useCallback(
      (element: HTMLVideoElement, src: string, autoPlay = false) => {
        if (isPlayerSupported) {
          if (playerRef.current) {
            playerRef.current.delete();
            playerRef.current = undefined;
          }

          const player = create({
            wasmBinary:
              "https://unpkg.com/amazon-ivs-player@1.11.0/dist/assets/amazon-ivs-wasmworker.min.wasm",
            wasmWorker:
              "https://unpkg.com/amazon-ivs-player@1.11.0/dist/assets/amazon-ivs-wasmworker.min.js",
          });

          playerRef.current = player;
          player.attachHTMLVideoElement(element);
          player.addEventListener(
            PlayerEventType.INITIALIZED,
            handlePlayerIntialized
          );
          player.addEventListener(PlayerEventType.ERROR, handleIVSError);

          player.setAutoplay(autoPlay);
          player.load(src);
          autoPlay && setPlaying(true);
          setMuted(autoPlay ? true : false);
        }
      },
      [playerRef, handleIVSError, handlePlayerIntialized]
    );

    const handleFullScreenClick = (): void => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (containerRef.current?.requestFullscreen) {
        containerRef.current?.requestFullscreen();
      }
    };

    const togglePlay = (): void => {
      if (playing) {
        playerRef.current?.pause();
      } else {
        playerRef.current?.play();
      }
      setPlaying(!playing);
    };

    useEffect(() => {
      if (src && videoRef.current && !initialized) {
        intializePlayer(videoRef.current, src, autoPlay);
      }
    }, [src, playerRef, videoRef, initialized, autoPlay, intializePlayer]);

    // useEffect(() => {
    //   if (playerRef.current && mutedProp !== undefined) {
    //     playerRef.current.setMuted(mutedProp);
    //     setMuted(mutedProp);
    //   }
    // }, [mutedProp, playerRef]);

    return (
      <Container ref={containerRef} {...containerProps} position="relative">
        <Box
          {...rest}
          h="100%"
          w="100%"
          ref={mergeRefs([videoRef, ref])}
          as="video"
          controls={false}
          playsInline
        />
        {controls && (
          <ControlsContainer
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            gridTemplateColumns="max-content max-content max-content 1fr max-content"
            py={space.xxxxs}
            pointerEvents={initialized ? "auto" : "none"}
            opacity={initialized ? 1 : 0.2}
          >
            <IconButton
              buttonStyle="flat-video"
              icon={playing ? "Pause" : "Play"}
              onClick={togglePlay}
            />
            <AnimatedBox
              display={["none", "flex"]}
              initial="hide"
              alignItems="center"
              whileHover="show"
            >
              <IconButton
                buttonStyle="flat-video"
                icon={muted || volume === 0 ? "VolumeOff" : "VolumeUp"}
                onClick={() => {
                  if (muted) {
                    playerRef.current?.setMuted(false);
                    setMuted(false);
                  } else {
                    playerRef.current?.setMuted(true);
                    setMuted(true);
                  }
                }}
              />
              <AnimatedBox
                mr={space.xxxs}
                variants={{
                  hide: {
                    opacity: 0,
                    transitionEnd: {
                      display: "none",
                    },
                  },
                  show: {
                    display: "block",
                    opacity: 1,
                  },
                }}
              >
                <RangeInput
                  initialValue={volume}
                  value={volume}
                  w={72}
                  min={0}
                  max={100}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const vol = event.target.valueAsNumber;
                    setVolume(vol);
                    playerRef.current?.setVolume(vol);
                  }}
                />
              </AnimatedBox>
            </AnimatedBox>
            <Flex
              alignItems="center"
              justifyContent="center"
              gridGap={space.xxxxs}
            >
              <Box h={8} w={8} borderRadius="50%" bg={colors.error} />
              <Text fontSize="1.2rem">LIVE</Text>
            </Flex>
            <Box />
            <IconButton
              buttonStyle="flat-video"
              icon="Fullscreen"
              onClick={handleFullScreenClick}
            />
          </ControlsContainer>
        )}
        {autoPlay && muted && controls && initialized && (
          <Box
            position="absolute"
            top={0}
            right={0}
            left={0}
            bottom={0}
            zIndex={2147483647}
            onClick={() => {
              setMuted(false);
              playerRef.current?.setMuted(false);
            }}
          >
            <Flex
              position="absolute"
              top={24}
              left={24}
              bg={colors.white[0]}
              p={space.xxxxs}
              alignItems="center"
              gridGap={space.xxxxs}
            >
              <Icon size={24} icon="VolumeOff" color={colors.black[0]} />
              <Text fontSize="1.6rem" color={colors.black[0]}>
                Tap to unmute
              </Text>
            </Flex>
          </Box>
        )}
      </Container>
    );
  }
);

IVSVideoPlayer.displayName = "IVSVideoPlayer";

export default IVSVideoPlayer;
