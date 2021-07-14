import styled, { css } from "styled-components";

export const NavWrapper = styled.nav`
  display: grid;
  grid-area: navbar;
  grid-template-rows: 48px 1fr 1fr;
  justify-items: center;

  ${(props) => {
    const { pallete, margins } = props.theme;
    return css`
      background: ${pallete.secondaryDark};
      border-right: 1px solid rgba(228, 228, 228, 0.1);
      padding: ${margins.lg} ${margins.sm} ${margins.med} ${margins.sm};
      grid-row-gap: ${margins.lg};
    `;
  }}
`;

export const ItemContainer = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 56px;
  border-radius: 12px;
  transition: background 200ms ease-in-out;
  background: ${(props) =>
    props.selected ? props.theme.pallete.dark : "transparent"};

  &:hover {
    background: ${(props) => props.theme.pallete.dark};
  }
`;

export const MenuWrapper = styled.div<{ count: number }>`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.count}, 56px)`};
  grid-row-gap: ${(props) => props.theme.margins.med};
`;
