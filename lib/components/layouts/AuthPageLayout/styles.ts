import styled, { css } from "styled-components";

export const SectionWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 40vw 1.5fr;
  min-height: 100vh;

  &::before {
    content: "";
    position: absolute;
    width: 40%;
    height: 100%;
    background-image: url("/images/signup-bg.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
  }
`;

export const HeroContainer = styled.div`
  align-items: start;
  ${(props) => {
    const { margins } = props.theme;
    return css`
      margin: ${margins.xl};
    `;
  }}

  &  > h4 {
    ${(props) => css`
      ${props.theme.textThemes.headline4}
      margin: ${props.theme.margins.lg} 144px 0 0;
      line-height: 4.2rem;
    `}
  }
`;

export const FormContainer = styled.div`
  margin: auto auto;
`;
