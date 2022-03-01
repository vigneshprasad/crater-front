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

  & > div.grid {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  & > div.grid > div.grid-item {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    grid-gap: 16px;
  }

  & > div.grid > div.grid-item > img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
  }

  & > div.grid > div.grid-item > p {
    font-size: 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    & > ul {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 16px;
    }
  }
`;

export default RewardDescriptionPreview;
