import { VideoHTMLAttributes } from "react";
import styled from "styled-components";

import { Box, BoxProps } from "../System/Box";

type Props = BoxProps & VideoHTMLAttributes<HTMLVideoElement>;

const Video = styled(Box)<Props>`
  object-fit: cover;
  object-position: center;
`;

export default function BackgroundVideo({ ...props }: Props): JSX.Element {
  return <Video as="video" {...props} />;
}

BackgroundVideo.defaultProps = {
  autoPlay: true,
  loop: true,
  muted: true,
};
