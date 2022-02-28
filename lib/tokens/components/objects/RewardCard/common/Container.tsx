import styled from "styled-components";

import { Box } from "@/common/components/atoms";

export const Container = styled(Box)`
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: -20%;
    left: 30%;
    z-index: -1;
    width: 140px;
    height: 140px;
    background-image: url("/images/img_reward_blob.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
