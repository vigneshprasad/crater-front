import styled from "styled-components";

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr;
  grid-auto-rows: minmax(100vh, 1fr);
  grid-template-areas: "navbar section";
`;

export const TabContainer = styled.section`
  grid-area: section;
`;
