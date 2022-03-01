import styled from "styled-components";

import { Grid } from "@/common/components/atoms";

export const Card = styled(Grid)`
  background: linear-gradient(
    170deg,
    rgba(157, 9, 255, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(40px);
  mix-blend-mode: color-burn;

  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: ${({ theme }) => theme.radii.xs}px;
`;
