import { MouseEventHandler, useRef } from "react";
import styled from "styled-components";

import { Box, BoxProps } from "../../atoms";
import { Button } from "../../atoms/Button";

type IProps = BoxProps & React.VideoHTMLAttributes<HTMLVideoElement>;

const Video = styled(Box)`
  object-fit: contain;
  object-position: center;
`;

export default function VideoPlayer({ ...rest }: IProps): JSX.Element {
  const playerRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = (): void => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  // const handlePIP = (): void => {
  //   if (document.pictureInPictureElement) {
  //     document.exitPictureInPicture();
  //   } else {
  //     if (document.pictureInPictureEnabled) {
  //       playerRef.current?.requestPictureInPicture();
  //     }
  //   }
  // };

  const onTimeUpdate = (): void => {
    if (playerRef.current) {
      console.log(playerRef.current.buffered.end(0));
      // console.log(playerRef.current.currentTime);
      // console.log(playerRef.current.duration);
    }
  };

  const onClick: MouseEventHandler<HTMLDivElement> = (event): void => {
    console.log(event.nativeEvent.offsetX);
  };

  return (
    <Box position="relative" w="100%">
      <Video
        onTimeUpdate={onTimeUpdate}
        controls={false}
        controlsList="nodownload"
        ref={playerRef}
        w="100%"
        as="video"
        {...rest}
      />
      <Box bottom={0}>
        <Box w="100%" bg="#fff" h={4} cursor="pointer" onClick={onClick} />
        <Button text="Play" onClick={handlePlayClick} />
      </Box>
    </Box>
  );
}
