import styled from "styled-components";

import { TabContainer } from "@components/layouts/HomePageLayout/styles";

export const SectionWrapper = styled(TabContainer)`
  display: grid;
  grid-template-columns: minmax(min-content, 432px) 1fr;
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0px;
  padding: ${(props) => props.theme.margins.lg};

  & > h4 {
    ${(props) => props.theme.textThemes.headline3}
  }
`;
