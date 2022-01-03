import styled from "styled-components";

import NextImage, { ImageProps } from "next/image";

import { Box } from "../System/Box";

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

export function Image({ ...props }: ImageProps): JSX.Element {
  return (
    <Container>
      <StyledImage layout="fill" {...props} />
    </Container>
  );
}
