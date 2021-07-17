import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  height: 48px;
  align-items: center;
  grid-column-gap: ${(props) => props.theme.margins.sm};
`;

export const LogoLabel = styled.p`
  ${(props) => props.theme.textThemes.headline5}
`;
