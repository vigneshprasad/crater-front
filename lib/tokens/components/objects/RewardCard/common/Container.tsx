import styled from "styled-components";

import { Box, BoxProps } from "@/common/components/atoms";

export const Container = styled(Box)<
  BoxProps & {
    blobImage?: string;
  }
>`
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: -10%;
    left: 30%;
    z-index: -1;
    width: 140px;
    height: 140px;
    background-image: ${({ blobImage }) =>
      blobImage ? `url('${blobImage}')` : `url("/images/img_reward_blob.png")`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
