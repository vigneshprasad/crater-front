import styled from "styled-components";

import NextImage, { ImageProps } from "next/image";

import { Box, BoxProps } from "../System/Box";

export type CustomImageProps = ImageProps & {
  boxProps?: BoxProps;
};

const Container = styled(Box)`
  & > span {
    position: unset !important;
  }
`;

const StyledImage = styled(NextImage)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

export function Image({ boxProps, ...props }: CustomImageProps): JSX.Element {
  return (
    <Container {...boxProps}>
      <StyledImage layout="fill" {...props} />
    </Container>
  );
}
