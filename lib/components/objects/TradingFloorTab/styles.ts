import styled from "styled-components";

import { TabContainer } from "@components/layouts/HomePageLayout/styles";

export const SectionWrapper = styled(TabContainer)`
  display: grid;
  grid-template-columns: minmax(min-content, 432px) 1fr;
`;

export const Heading = styled.h4``;

export const ListColumn = styled.div`
  display: grid;
  grid-template-rows: minmax(min-content, 184px) 1fr;
  border-right: 1px solid rgba(228, 228, 228, 0.1);
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0px;
  padding: ${(props) => props.theme.margins.lg};

  & > h4 {
    ${(props) => props.theme.textThemes.headline3}
  }
`;
