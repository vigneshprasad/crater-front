import styled from "styled-components";

import { Box } from "@/common/components/atoms";

const RewardDescriptionPreview = styled(Box)`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  & > h3 {
    font-size: 1.6rem;
    font-weight: 700;
  }

  & > p {
    font-size: 1.4rem;
  }

  & > ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }

  & > ul > li {
    list-style: square;
    font-size: 1.2rem;
  }
`;

export default RewardDescriptionPreview;
