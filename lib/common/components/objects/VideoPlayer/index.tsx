import { LayoutProps } from "framer-motion";
import styled from "styled-components";
import {
  borders,
  compose,
  background,
  space,
  layout,
  flex,
  grid,
  position,
  BorderProps,
  BackgroundProps,
  FlexProps,
  GridProps,
  PositionProps,
  SpaceProps,
} from "styled-system";

import { Box } from "../../atoms";

type VideoBoxProps = BorderProps &
  BackgroundProps &
  SpaceProps &
  LayoutProps &
  FlexProps &
  GridProps &
  PositionProps &
  React.VideoHTMLAttributes<HTMLVideoElement>;

const VideoBox = styled.video<VideoBoxProps>`
  display: block;
  box-sizing: border-box;
  width: 100%;
  object-fit: contain;

  ${compose(borders, background, space, layout, flex, grid, position)}
`;

export default function VideoPlayer({ ...rest }: VideoBoxProps): JSX.Element {
  return (
    <Box w="100%" h="100%" position="relative">
      <VideoBox {...rest} />
    </Box>
  );
}
