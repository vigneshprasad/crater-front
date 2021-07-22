import Svg from "public/svg";
import styled from "styled-components";

export const DropdownWrapper = styled.div`
  ${(props) => props.theme.textThemes.menu}
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 8px 12px;
  grid-column-gap: 4px;
  border-radius: 8px;
  transition: all 200ms ease-in;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const Icon = styled(Svg.ChevronDown)``;

export const HeaderContainer = styled.div`
  color: ${(props) => props.theme.pallete.textTertiary};
  margin: auto auto;
`;
