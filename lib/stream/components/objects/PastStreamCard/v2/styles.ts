import styled from "styled-components";

import { Flex, Grid } from "@/common/components/atoms";

export const Overlay = styled(Grid)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: all 0.2s ease-in;
`;

export const Container = styled(Flex)`
  &:hover ${Overlay} {
    opacity: 1;
    background: rgba(145, 70, 255, 0.4);
  }
`;
